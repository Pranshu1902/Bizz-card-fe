import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { me, updateProfile } from "../api/ApiUtils";
import Header from "../Common/Header";

export default function Profile() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [id, setId] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    me().then((data) => {
      setUsername(data.username);
      setPassword(data.password);
      setId(data.id);
      setLoading(false);
    });

    document.title = "Profile | Bizz Card";
  }, []);

  const updateUser = (event: any) => {
    event.preventDefault();
    setLoading(true);
    updateProfile(id, username, password).then(() => {
      setLoading(false);
    });
  };

  return (
    <div>
      <Header tab={"Profile"} />
      <div className="p-4 bg-gradient-to-bl from-purple-100 to-purple-400 min-h-screen">
        <p className="text-5xl font-bold text-[#4c00b0]">Profile</p>
        {loading ? (
          <div className="flex justify-center pt-6">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="p-4 gap-4 w-full flex flex-col justify-center items-center">
            <div>
              <p className="text-gray-500 font-semibold">Username:</p>
              <input
                className="py-2 rounded-lg p-2 border-2 border-blue-500 font-bold shadow-lg"
                type="text"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                value={username}
              />
            </div>
            <div>
              <Button
                variant="contained"
                color="secondary"
                onClick={updateUser}
              >
                Update
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
