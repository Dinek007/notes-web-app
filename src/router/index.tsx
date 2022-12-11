import { useRoutes} from "react-router";
import { routes } from "./router.routes";

export const AppRoutes = () => {
  const appRoutes = useRoutes(routes);

  return appRoutes;
};
