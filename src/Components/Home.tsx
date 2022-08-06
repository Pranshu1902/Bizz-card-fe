import { Button, CircularProgress } from "@mui/material";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import { getCards, me } from "../api/ApiUtils";
import { card } from "../Common/DataType";
import Header from "../Common/Header";
import Popup from "../Common/Popup";
import DeleteCard from "./Modals/DeleteCard";
import PreviewCard from "./Modals/PreviewCard";

export default function Home() {
  const [username, setUsername] = useState("");
  const sampleCardsList: card[] = [];
  const [cards, setCards] = useState(sampleCardsList);
  const [loading, setLoading] = useState(true);
  const [deleteCard, setDeleteCard] = useState(false);
  const [cardItem, setCardItem] = useState<card>({
    id: 0,
    name: "",
    description: "",
    location: "",
    title: "",
    phone: "",
    email: "",
    color: "",
    links: [],
  });
  const [previewCard, setPreviewCard] = useState(false);

  const fetchData = () => {
    setLoading(true);
    getCards().then((data) => {
      setCards(data);
      setLoading(false);
    });
  };

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }

    me().then((data) => {
      setUsername(data.username);
    });

    fetchData();

    document.title = "Home | Bizz Card";
  }, []);

  return (
    <div>
      <Header tab={"Home"} />
      <div className="p-4 text-[#4c00b0] bg-gradient-to-bl from-purple-100 to-purple-300 min-h-screen">
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
            {cards.length > 0 ? (
              cards.map((card: card) => (
                <div
                  className={`${
                    card.color === "purple"
                      ? "bg-purple-100"
                      : card.color === "blue"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-red-100 text-red-600"
                  } flex flex-row gap-4 p-4 rounded-xl relative hover:scale-105 transition duration-300`}
                >
                  <div>
                    <i className=" text-7xl fa fa-user"></i>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-3xl font-bold">{card.name}</p>
                      <p className="text-xl">{card.title}</p>
                    </div>
                  </div>
                  <div className="flex gap-4 right-2 bottom-2 absolute text-xl">
                    <i
                      className="fa fa-edit cursor-pointer hover:scale-125 transition duration-300"
                      onClick={() => navigate(`/update/${card.id}`)}
                    ></i>
                    <i
                      className="fa fa-eye cursor-pointer hover:scale-125 transition duration-300"
                      onClick={() => {
                        setPreviewCard(true);
                        setCardItem(card);
                      }}
                    ></i>
                    <i
                      className="fa fa-remove cursor-pointer hover:text-red-500 hover:scale-125 transition duration-300"
                      onClick={() => {
                        setDeleteCard(true);
                        setCardItem(card);
                      }}
                    ></i>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-3xl flex justify-center items-center pt-6 w-screen">
                No cards found
              </div>
            )}
          </div>
        )}
      </div>
      <Popup open={deleteCard} onClose={() => setDeleteCard(false)}>
        <DeleteCard
          card={cardItem}
          onCloseCB={() => {
            setDeleteCard(false);
            fetchData();
          }}
        />
      </Popup>
      <Popup open={previewCard} onClose={() => setPreviewCard(false)}>
        <PreviewCard card={cardItem} onCloseCB={() => setPreviewCard(false)} />
      </Popup>
    </div>
  );
}
