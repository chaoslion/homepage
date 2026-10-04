export interface ReleaseHistory {
  hash: string;
  hash_short: string;
  date: Date;
  name: string;
  message: string;
}

interface BuildInfo {
  release: string;
  history: ReleaseHistory[];
}

export type BuildInfoMap = Record<string, BuildInfo>;

interface ModuleName {
  name: string;
  resolved: string;
}

export function getVirtualModuleName(name: string): ModuleName {
  const moduleName = `virtual:${name}`;
  return {
    name: moduleName,
    resolved: `\0${moduleName}`,
  };
}
