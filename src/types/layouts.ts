export interface UrlPart {
  label: string;
  href: string;
}

export interface BaseProps {
  breadcrumbs?: string[];
  description?: string;
  supportsIndex?: boolean;
  supportsSearchIndex?: boolean;
  title?: string;
}
