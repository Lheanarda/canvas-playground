import { lazyWithRetries } from "@src/lib/utils/core";
import { Route } from "@src/typings/routes";

const TestRoutes: Route[] = [
  {
    path: "/constellation",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/constellation")
    ),
  },
  {
    path: "/fractals",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/fractals")
    ),
  },
  {
    path: "/text-particles",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/fractals")
    ),
  },
  {
    path: "/snake-and-ladders",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/snackAndLadders")
    ),
  },
];

export default TestRoutes;
