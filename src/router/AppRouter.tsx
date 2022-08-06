import { useRoutes } from "raviger";
import Card from "../Components/Card";
import Home from "../Components/Home";
import LandingPage from "../Components/LandingPage";
import Preview from "../Components/Preview";
import Profile from "../Components/Profile";
import PublicPreview from "../Components/PublicPreview";
import Login from "../Components/User/Login";
import Signup from "../Components/User/Signup";

const routes = {
  "/": () => <LandingPage />,
  "/home": () => <Home />,
  "/preview/:id": ({ id }: { id: string }) => <Preview id={Number(id)} />,
  "/card/:userId/:cardId": ({
    userId,
    cardId,
  }: {
    userId: string;
    cardId: string;
  }) => <PublicPreview userId={Number(userId)} cardId={Number(cardId)} />,
  "/profile": () => <Profile />,
  "/create": () => <Card type="create" id={0} />,
  "/update/:id": ({ id }: { id: string }) => (
    <Card type="edit" id={Number(id)} />
  ),
  "/login": () => <Login />,
  "/signup": () => <Signup />,
};

export default function AppRouter() {
  const route = useRoutes(routes);
  return <div>{route}</div>;
}
