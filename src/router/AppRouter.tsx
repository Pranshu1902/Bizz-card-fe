import { useRoutes } from "raviger";
import Home from "../Components/Home";
import LandingPage from "../Components/LandingPage";

const routes = {
  "/": () => <LandingPage />,
  "/home": () => <Home />,
};

export default function AppRouter() {
  const route = useRoutes(routes);
  return <div>{route}</div>;
}
