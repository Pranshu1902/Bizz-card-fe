import { useEffect } from "react";
import Header from "../Common/Header";

export default function Preview() {
  useEffect(() => {
    document.title = "Preview | Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"Preview"} />
      <div>Preview</div>
    </div>
  );
}
