import { lazyWithRetries } from "@src/lib/utils/core";
import { Route } from "@src/typings/routes";

const TestRoutes: Route[] = [
  {
    path: "/constellation",
    component: lazyWithRetries(
      () => import("@src/pages/introduction/constellation")
    ),
  },
];

export default TestRoutes;
