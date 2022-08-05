import { Button, CircularProgress } from "@mui/material";
import { Link, navigate } from "raviger";
import { useEffect, useState } from "react";
import { signup } from "../../api/ApiUtils";
import logo from "../../Images/logo.png";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [successError, setSuccessError] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
    } else {
      try {
        setLoading(true);
        signup(username, password).then(() => {
          navigate(`/login`);
          setError("Signup successful!");
          setSuccessError(true);
          setLoading(false);
        });
      } catch (error) {
        setError("Signup Failed!!!");
        setSuccessError(false);
        console.log(error);
        setLoading(false);
      }
      setPassword("");
      setConfirmPassword("");
    }
  };

  useEffect(() => {
    document.title = "Sign up | Money Manager";
  }, []);

  return (
    <div>
      <div className="h-screen flex md:flex-row flex-col gap-4">
        <div className="p-4 bg-gradient-to-l from-purple-400 to-purple-600 md:w-1/2 w-full md:p-4 flex flex-col gap-4 justify-center items-center">
          <img src={logo} alt="logo" />
          <h1 className="font-bold text-white text-7xl flex justify-center items-center">
            Bizz Card
          </h1>
          <p className="text-white font-semibold text-xl">
            Create sharable digital cards
          </p>
        </div>
        <div className="md:w-1/2 w-full md:p-4 flex flex-col items-center justify-center">
          <p className="flex items-center justify-center text-5xl font-bold text-purple-500">
            Sign up
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
            <div>
              <p className="font-bold text-gray-500">Confirm Password:</p>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="p-1 border-2 border-purple-300 py-2 rounded-lg"
                name=""
                id="pass"
              />
            </div>
            {error.length > 0 && (
              <p
                className={`${
                  successError ? "text-green-500" : "text-red-500"
                }`}
              >
                {error}
              </p>
            )}
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
                Signup
              </Button>
            )}
          </form>
          <p className="text-xl text-gray-500 flex justify-center items-center pt-4">
            Already have an account?&nbsp;
            <Link
              href="/login"
              className="font-bold text-blue-500 hover:text-blue-700"
            >
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
