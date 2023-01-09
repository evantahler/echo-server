const namespace = "cache";

declare module "actionhero" {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<typeof DEFAULT[typeof namespace]>;
  }
}

export const DEFAULT = {
  [namespace]: () => {
    return {
      cache_size: parseInt(process.env.CACHE_SIZE) ?? 1000,
    };
  },
};
