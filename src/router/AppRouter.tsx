import { useRoutes } from "raviger";
import Home from "../Components/Home";
import LandingPage from "../Components/LandingPage";
import Login from "../Components/User/Login";
import Signup from "../Components/User/Signup";

const routes = {
  "/": () => <LandingPage />,
  "/home": () => <Home />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
};

export default function AppRouter() {
  const route = useRoutes(routes);
  return <div>{route}</div>;
}
