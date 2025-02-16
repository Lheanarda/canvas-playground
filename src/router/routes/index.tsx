import { Route } from "@src/typings/routes";
import PlaygroundRoutes from "./Playground";
import IntroductionRoutes from "./Introduction";

export const MainPageRoute = "/constellation";

const Routes: Route[] = [...IntroductionRoutes, ...PlaygroundRoutes];

export default Routes;
