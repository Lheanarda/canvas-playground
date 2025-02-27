import { Route } from "@src/typings/routes";
import PlaygroundRoutes from "./Playground";
import IntroductionRoutes from "./Introduction";
import { lazyWithRetries } from "@src/lib/utils/core";

export const MainPageRoute = "/constellation";

const Routes: Route[] = [
  {
    path: "/start",
    component: lazyWithRetries(() => import("@src/pages/start")),
  },
  ...IntroductionRoutes,
  ...PlaygroundRoutes,
];

export default Routes;
