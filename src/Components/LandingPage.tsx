import { useEffect } from "react";
import Header from "../Common/Header";
import bg from "../Images/bg.jpeg";
import home from "../Images/home.png";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Bizz Card";
  }, []);

  return (
    <div className="">
      <Header tab={"LandingPage"} />
      <div className="absolute">
        <div className="flex flex-col-reverse gap-4 justify-center items-center p-4">
          <div className="md:w-1/3">
            <img src={home} className="rounded-xl" alt="" />
          </div>
          <p
            style={{ fontFamily: "Times New Roman, Times, serif" }}
            className="flex justify-center text-white font-mono font-bold text-5xl"
          >
            Create your identity today by using our simple and easy to use
            website to leave an amazing first impression.
          </p>
        </div>
      </div>
      <img className="w-screen h-screen" src={bg} alt="" />
    </div>
  );
}
