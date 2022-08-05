import { useRoutes } from "raviger";
import Home from "../Components/Home";
import LandingPage from "../Components/LandingPage";
import Preview from "../Components/Preview";
import Profile from "../Components/Profile";
import Login from "../Components/User/Login";
import Signup from "../Components/User/Signup";

const routes = {
  "/": () => <LandingPage />,
  "/home": () => <Home />,
  "/preview": () => <Preview />,
  "/profile": () => <Profile />,
  "/login": () => <Login />,
  "/signup": () => <Signup />,
};

export default function AppRouter() {
  const route = useRoutes(routes);
  return <div>{route}</div>;
}
