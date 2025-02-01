import { Route } from "@src/typings/routes";
import PlaygroundRoutes from "./Playground";

export const MainPageRoute = "/constellation";

const Routes: Route[] = [...PlaygroundRoutes];

export default Routes;
