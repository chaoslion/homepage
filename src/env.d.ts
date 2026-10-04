interface ImportMetaEnv {
  readonly CUSTOM_BUILD_DATE: string;
  readonly CUSTOM_CONTENT_PATH: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module 'virtual:build-info' {
  export const buildInfo: import('#plugins-vite').BuildInfoMap;
}
