import { simpleGit } from 'simple-git';

import { getVirtualModuleName, type BuildInfoMap } from './internal';

const moduleName = getVirtualModuleName('build-info');

export default function plugin(repos: Record<string, string>, dev: boolean) {
  return {
    name: 'custom-build-info-module',
    resolveId(id: string) {
      if (id === moduleName.name) {
        return moduleName.resolved;
      }
    },
    async load(id: string) {
      if (id !== moduleName.resolved) {
        return;
      }
      const buildInfo: BuildInfoMap = {};
      for (const [name, path] of Object.entries(repos)) {
        const git = simpleGit(path);

        let hasCommits = true;
        try {
          await git.raw(['rev-parse', '--verify', 'HEAD']);
        } catch {
          hasCommits = false;
        }

        if (dev || !hasCommits) {
          buildInfo[name] = {
            release: 'dev',
            history: [
              {
                hash: 'd24ac6a620f1f232a1af45c5edd34e6c94832300',
                hash_short: 'd24ac6a6',
                date: new Date('2025-01-02'),
                name: 'v1.0.1',
                message: 'bugfix release\nwith newline\neof',
              },
              {
                hash: '6d0b4ee95f1191003c47e2d59c5b2212d329e60f',
                hash_short: '6d0b4ee9',
                date: new Date('2025-01-01'),
                name: 'v1.0.0',
                message: 'initial release',
              },
            ],
          };
          continue;
        }

        const currentReleaseDescription = await git.raw([
          'describe',
          '--match',
          'v*',
          '--always',
          '--dirty',
          '--abbrev',
        ]);

        const annotatedReleaseTags = await git.tags([
          '--format=%(if:equals=tag)%(objecttype)%(then)%(refname)%(end)',
          'v*',
        ]);
        const annotatedReleaseTagsHistory = await Promise.all(
          annotatedReleaseTags.all.map(
            async (refName) =>
              await git.raw([
                'for-each-ref',
                '--sort=-creatordate',
                '--format=%(refname:short)%0a%(*objectname)%0a%(*objectname:short)%0a%(taggerdate)%0a%(contents)',
                refName,
              ]),
          ),
        );

        buildInfo[name] = {
          release: currentReleaseDescription.trim(),
          history: annotatedReleaseTagsHistory.map((line) => {
            const [name, hash, hash_short, date, ...content] = line.split('\n');
            return {
              hash,
              hash_short,
              date: new Date(date),
              name,
              message: content.join('\n').trim(),
            };
          }),
        };
      }
      return `export const buildInfo = ${JSON.stringify(buildInfo, null, 2)};`;
    },
  };
}
