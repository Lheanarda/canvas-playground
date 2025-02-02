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
      () => import("@src/pages/introduction/textParticles")
    ),
  },
  {
    path: "/snake-and-ladders",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/snackAndLadders")
    ),
  },
  {
    path: "/bubble",
    component: lazyWithRetries(() => import("@src/pages/introduction/bubble")),
  },
  {
    path: "/liquid",
    component: lazyWithRetries(() => import("@src/pages/introduction/liquid")),
  },
  {
    path: "/snow",
    component: lazyWithRetries(() => import("@src/pages/introduction/snow")),
  },
  {
    path: "/framer",
    component: lazyWithRetries(() => import("@src/pages/introduction/framer")),
  },
];

export default TestRoutes;
