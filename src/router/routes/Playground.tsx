import { lazyWithRetries } from "@src/lib/utils/core";
import { Route } from "@src/typings/routes";

const PlaygroundRoutes: Route[] = [
  {
    path: "/gravity",
    component: lazyWithRetries(() => import("@src/pages/playground/gravity")),
  },
  {
    path: "/converter",
    component: lazyWithRetries(() => import("@src/pages/playground/converter")),
  },
  {
    path: "/code",
    component: lazyWithRetries(() => import("@src/pages/playground/code")),
  },
];

export default PlaygroundRoutes;
