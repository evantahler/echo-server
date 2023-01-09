import { RoutesConfig } from "actionhero";

const namespace = "routes";

declare module "actionhero" {
  export interface ActionheroConfigInterface {
    [namespace]: ReturnType<typeof DEFAULT[typeof namespace]>;
  }
}

export const DEFAULT: { [namespace]: () => RoutesConfig } = {
  [namespace]: () => {
    return {
      get: [
        { path: "/status", action: "status" },
        { path: "/swagger", action: "swagger" },
        { path: "/logs", action: "logs:list" },
      ],
      post: [{ path: "/log", action: "log:append" }],
      put: [{ path: "/log", action: "log:append" }],
    };
  },
};
