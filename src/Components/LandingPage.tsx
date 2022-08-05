import { useEffect } from "react";
import logo from "../Images/logo.png";
import Header from "../Common/Header";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"LandingPage"} />
      <div>
        <div className="flex flex-col md:flex-row-reverse gap-4 justify-center items-center p-4">
          <div className="md:w-1/3">
            <img src={logo} alt="" />
          </div>
          <p className="flex md:w-1/3 justify-center text-[#4c00b0] font-bold text-3xl">
            Create your identity today by using our simple and easy to use
            website to leave an amazing first impression.
          </p>
        </div>
      </div>
    </div>
  );
}
