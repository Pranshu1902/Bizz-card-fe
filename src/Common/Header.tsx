import { Button } from "@mui/material";
import { navigate } from "raviger";
import logo from "../Images/logo.png";
import DropDown from "./DropDown";

export default function Header(props: { tab: string }) {
  return (
    <div className="bg-gradient-to-tr from-[#ca5cdd] to-[#8a00c2] p-3">
      <div className="flex justify-between">
        <div className="w-1/4 flex items-center">
          <img
            width={100}
            src={logo}
            alt="logo"
            onClick={() => navigate("/")}
          />
        </div>
        <div className="w-1/2 flex justify-center">
          <h1 className="text-7xl font-bold font-serif text-[#ffffff]">
            Bizz Card
          </h1>
        </div>
        <div className="flex w-1/4 justify-end items-center">
          {props.tab === "LandingPage" ? (
            <Button
              variant="contained"
              style={{ backgroundColor: "#4c00b0", color: "white" }}
              href="/home"
            >
              Get personal card
            </Button>
          ) : (
            <div>
              <DropDown currentTab={props.tab} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
