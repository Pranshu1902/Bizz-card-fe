import { useEffect } from "react";
import Header from "../Common/Header";
import bg from "../Images/bg.jpeg";
import home from "../Images/home.png";

export default function LandingPage() {
  useEffect(() => {
    document.title = "Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"LandingPage"} />
      <div className="bg-purple-200 min-h-screen">
        <div className="flex flex-col-reverse gap-4 justify-center items-center p-4">
          <div className="md:w-1/3">
            <img src={home} className="rounded-xl" alt="" />
          </div>
          <p
            style={{ fontFamily: "Times New Roman, Times, serif" }}
            className="flex justify-center text-purple-800 font-mono font-bold text-5xl"
          >
            Create your identity today by using our simple and easy to use
            website to leave an amazing first impression.
          </p>
        </div>
        <div className="flex justify-center items-center text-purple-700 pt-16">
          Made with &nbsp;<i className="fa fa-heart"></i>&nbsp; by&nbsp;
          <a
            href="https://pranshu1902.netlify.app"
            target={"_blank"}
            rel={"noreferrer"}
            className="hover:text-purple-900 hover:font-bold transition duration-300 underline"
          >
            Pranshu
          </a>
        </div>
      </div>
    </div>
  );
}
