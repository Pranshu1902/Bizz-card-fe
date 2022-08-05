import { navigate } from "raviger";
import { useEffect, useState } from "react";
import { me } from "../api/ApiUtils";
import Header from "../Common/Header";

export default function Home() {
  const [username, setUsername] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    me().then((data) => {
      setUsername(data.username);
    });

    document.title = "Home | Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"Home"} />
      <div>
        Home page
        <p>{username}</p>
      </div>
    </div>
  );
}
