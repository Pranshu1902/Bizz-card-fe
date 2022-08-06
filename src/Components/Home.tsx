import { Button, CircularProgress } from "@mui/material";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import { getCards, me } from "../api/ApiUtils";
import { card } from "../Common/DataType";
import Header from "../Common/Header";

export default function Home() {
  const [username, setUsername] = useState("");
  const sampleCardsList: card[] = [];
  const [cards, setCards] = useState(sampleCardsList);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    me().then((data) => {
      setUsername(data.username);
    });

    setLoading(true);
    getCards().then((data) => {
      setCards(data);
      setLoading(false);
    });

    document.title = "Home | Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"Home"} />
      <div className="p-4 text-[#4c00b0]">
        <p className="text-gray-500 text-4xl">Home</p>
        <div className="flex flex-col md:flex-row justify-between gap-4">
          <div>
            <p className="text-5xl">Welcome {username}</p>
          </div>
          <div className="w-full md:w-auto">
            <Button
              variant="contained"
              fullWidth
              style={{ backgroundColor: "#ca5cdd" }}
              href="/create"
            >
              <i className="fa fa-add"></i>&nbsp;Create new card
            </Button>
          </div>
        </div>
        {loading ? (
          <div className="flex justify-center items-center pt-6">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div>
            {cards.length > 0 ? (
              cards.map((card: card) => {
                return <div>{card.name}</div>;
              })
            ) : (
              <div className="text-3xl flex justify-center items-center pt-6">
                No cards found
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
