export type ThemeState = 'light' | 'dark';

interface ThemeManagerConfig {
  browserMediaQuery: string;
  htmlAttributeKey: string;
  stateFallbackValue: ThemeState;
  storageValue: string;
  stateValue: Record<ThemeState, string>;
  themeNames: Record<ThemeState, string>;
}

export const THEMEMANAGER_CONFIG: ThemeManagerConfig = {
  browserMediaQuery: '(prefers-color-scheme: dark)',
  htmlAttributeKey: 'data-theme',
  stateFallbackValue: 'light',
  storageValue: 'theme',
  stateValue: {
    light: 'light',
    dark: 'dark',
  },
  themeNames: {
    light: 'fantasy',
    dark: 'dracula',
  },
};

class ThemeManager {
  currentState: ThemeState | undefined = $state(undefined);
  get isUnknown() {
    return this.currentState === undefined;
  }
  get isLight() {
    return this.currentState === 'light';
  }
  get isDark() {
    return this.currentState === 'dark';
  }
  // get next(): ThemeState {
  //   switch (this.currentState) {
  //     case "light":
  //       return "dark";
  //     case "dark":
  //       return "light";
  //   }
  //   return "light";
  // }
  querylocalStorage(): ThemeState | undefined {
    const localStorageValue = localStorage.getItem(
      THEMEMANAGER_CONFIG.storageValue,
    );

    switch (localStorageValue) {
      case 'light':
        return 'light';
      case 'dark':
        return 'dark';
      default:
        return undefined;
    }
  }
  init() {
    window.addEventListener('storage', (e) => {
      if (e.key === THEMEMANAGER_CONFIG.storageValue) {
        switch (e.newValue) {
          case 'light':
            this.switch('light');
            break;
          case 'dark':
            this.switch('dark');
            break;
        }
      }
    });

    const browserMediaQuery = window.matchMedia(
      THEMEMANAGER_CONFIG.browserMediaQuery,
    );
    browserMediaQuery.addEventListener('change', (e) => {
      const themeState: ThemeState = e.matches ? 'dark' : 'light';

      if (this.querylocalStorage() !== undefined) {
        return;
      }

      this.switch(themeState);
    });

    const themeState = this.querylocalStorage();
    if (themeState === undefined) {
      this.switch(browserMediaQuery.matches ? 'dark' : 'light');
    } else {
      this.switch(themeState);
    }
  }
  applyFromStorage() {
    const themeState = this.querylocalStorage();
    if (themeState === undefined) {
      // if init was run this should not happen
      throw new Error('theme state not found in localStorage');
    }
    document.documentElement.setAttribute(
      THEMEMANAGER_CONFIG.htmlAttributeKey,
      THEMEMANAGER_CONFIG.themeNames[themeState!],
    );
  }
  switch(target: ThemeState) {
    document.documentElement.setAttribute(
      THEMEMANAGER_CONFIG.htmlAttributeKey,
      THEMEMANAGER_CONFIG.themeNames[target],
    );
    localStorage.setItem(THEMEMANAGER_CONFIG.storageValue, target);
    this.currentState = target;
  }
  toggle() {
    switch (this.currentState) {
      case 'light':
        this.switch('dark');
        break;
      case 'dark':
        this.switch('light');
        break;
      default:
        return;
    }
  }
}

export const themeManager = new ThemeManager();
