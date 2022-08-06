import { useEffect } from "react";
import Header from "../Common/Header";

export default function Profile() {
  useEffect(() => {
    document.title = "Profile | Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"Profile"} />
      <div>Profile</div>
    </div>
  );
}
