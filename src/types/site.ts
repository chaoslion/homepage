import type { ThemeState } from '#/data/theme.svelte';
import type { BuildInfoMap } from '#plugins-vite';

export interface Link {
  href: string;
  label: string;
}

export interface SocialLink extends Link {
  icon: string;
  isDownload?: boolean;
}

export interface NavLink {
  link: Link;
  icon: string;
  location: 'header' | 'header-mobile' | 'footer' | 'footer-secondary';
  title?: string;
}

interface Stat {
  label: string;
  value: () => string;
  description: string;
}

export interface TechCategoryItem {
  icon: string;
  label?: string;
  techs: string[];
}

// interface BuildChangeLogItem {
//   date: Date;
//   commit: string;
// }
// export interface Build {
//   hash: string;
//   tag: string;
//   changelog: BuildChangeLogItem[];
// }

// interface BuildInfoRepo {
//   hash: string;
//   tag: string;
// }

interface Build {
  date: string;
  repoUrl: (repo: string, tag: string) => string | undefined;
  repos: BuildInfoMap;
}

interface CodeBlockLanguage {
  label?: string;
  ext?: string;
  entrypoint?: string;
}

interface PostsConfig {
  codeBlockLanguageOverride: Record<string, CodeBlockLanguage>;
  indexMax: number;
  legacyCutoff: Date;
  maxRelated: number;
  maxSummary: number;
  maxTOCDepth: number;
  maxTags: number;
  previewCoverWidth: number;
  previewCoverClass: string;
  previewMaxTags: number;
  previewPagination: number;
  previewPaginationCount: number;
  readingSpeedAverage: number;
  thumbnailWidth: number;
}

export interface SiteConfig {
  author: string;
  authorName: string;
  authorShort: string;
  authorSurname: string;
  authorDescription: string;
  siteDescription: string;
  build: Build;
  codewarsBadge: string;
  codewarsReferalUrl: string;
  copyright: string;
  description: string;
  description_credits: string;
  description_href?: string;
  heroTitleBuildingVariants: string[];
  mail: string;
  mailAlum: string;
  navIconClass: string;
  navLinks: NavLink[];
  posts: PostsConfig;
  socialLinks: SocialLink[];
  stats: (firstPostDate: Date, tagsCount: number) => Stat[];
  techStack: Record<string, TechCategoryItem>;
  terminalSpeed: number;
  terminalStrings: string[];
  themeIcons: Record<ThemeState, string>;
  title: string;
  titlePath: string[];
  trackingId: string;
  trackingPixelUrl: string;
  trackingUrl: string;
  welcome: string;
}
