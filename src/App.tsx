import { useState } from "react";
import "./App.css";
import AppRouter from "./router/AppRouter";

function App() {
  const user: any = null;
  const [currentUser, setCurrentUser] = useState(user);

  return <AppRouter />;
}

export default App;
