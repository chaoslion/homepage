import type { SatteriAstroData } from "@astrojs/markdown-satteri";

declare module "satteri" {
  interface DataMap {
    mathJaxReady?: Promise<void>;
    i: number;
    astro: SatteriAstroData;
  }
}

export {};
