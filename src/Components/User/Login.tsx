import { Link, navigate } from "raviger";
import React, { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";
import logo from "../../Images/logo.png";
import { login } from "../../api/ApiUtils";
import { Button } from "@mui/material";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    const data = await login(username, password);
    if (data.token) {
      localStorage.setItem("token", data.token);
      setLoading(false);
      navigate(`/home`);
    } else {
      setError("Invalid login credentials");
      setLoading(false);
      setPassword("");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      navigate("/home");
    }

    document.title = "Login | Money Manager";
  }, []);

  return (
    <div>
      <div className="h-screen flex md:flex-row flex-col gap-4">
        <div className="p-4 bg-gradient-to-l from-purple-400 to-purple-600 md:w-1/2 w-full md:p-4 flex flex-col gap-4 justify-center items-center">
          <img src={logo} alt="" />
          <h1 className="font-bold text-white text-7xl flex justify-center items-center">
            Bizz Card
          </h1>
          <p className="text-white font-semibold text-xl">
            Create sharable digital cards
          </p>
        </div>
        <div className="md:w-1/2 w-full md:p-4 flex flex-col items-center justify-center">
          <p className="flex items-center justify-center text-5xl font-bold text-purple-500">
            Login
          </p>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center justify-center gap-6 pt-24"
          >
            <div>
              <p className="font-bold text-gray-500">Username:</p>
              <input
                type="text"
                className="p-1 border-2 border-purple-300 py-2 rounded-lg"
                name=""
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                id=""
              />
            </div>
            <div>
              <p className="font-bold text-gray-500">Password:</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="p-1 border-2 border-purple-300 py-2 rounded-lg"
                name=""
                id="pass"
              />
            </div>
            {error.length > 0 && <p className="text-red-500">{error}</p>}
            <br />
            {loading ? (
              <div>
                <CircularProgress color="secondary" />
              </div>
            ) : (
              <Button
                variant="contained"
                type="submit"
                style={{ backgroundColor: "#b100cd" }}
              >
                Login
              </Button>
            )}
          </form>
          <p className="text-xl text-gray-500 flex justify-center items-center pt-4">
            New User?&nbsp;
            <Link
              href="/signup"
              className="font-bold text-blue-500 hover:text-blue-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
