import type { Link } from '#/types/generic';
import type { BuildInfoMap } from '#plugins-vite';

export type ThemeState = 'light' | 'dark';

export interface BaseProps {
  breadcrumbs?: string[];
  description?: string;
  supportsIndex?: boolean;
  supportsSearchIndex?: boolean;
  title?: string;
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

export interface Stat {
  label: string;
  value: string;
  description: string;
}

export interface TechCategoryItem {
  icon: string;
  label?: string;
  techs: string[];
}

interface Build {
  date: string;
  repoUrl: (repo: string, tag: string) => string | undefined;
  repos: BuildInfoMap;
}

interface PostsConfig {
  codeBlockLanguageOverride: Record<string, string>;
  stickyMax: number;
  indexMax: number;
  introLabel: (legacy: boolean) => string | undefined;
  legacyCutoff: Date;
  maxRelated: number;
  maxSummary: number;
  maxTOCDepth: number;
  maxTags: number;
  previewCoverClass: string;
  previewCoverWidth: number;
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
  stats: Stat[];
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
