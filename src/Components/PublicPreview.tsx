import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getPublicCards, getPublicLinks } from "../api/ApiUtils";
import { card, link, publicCard, publicLink } from "../Common/DataType";

export default function PublicPreview(props: {
  userId: number;
  cardId: number;
}) {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<link[]>([]);
  const [card, setCard] = useState<card>({
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

  useEffect(() => {
    getPublicCards().then((data) => {
      setCard(data.filter((card: publicCard) => card.id === props.cardId)[0]);

      console.log(
        data.filter((card: publicCard) => card.id === props.cardId)[0]
      );
      console.log(data);

      getPublicLinks().then((datas) => {
        setLinks(
          datas.filter(
            (link: publicLink) => Number(link.card) === Number(props.cardId)
          )
        );
        setLoading(false);
      });
    });

    document.title = card.name + " | Bizz Card";
  }, [card.name, props.cardId, props.userId]);

  return (
    <div>
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-purple-200 to-purple-400">
        {loading ? (
          <div className="flex justify-center items-center pt-12">
            <CircularProgress color="secondary" />
          </div>
        ) : (
          <div className="p-4 flex justify-center items-center pt-6">
            {card && (
              <div
                className={`${
                  card.color === "purple"
                    ? "bg-purple-100 text-[#4c00b0]"
                    : card.color === "blue"
                    ? "bg-blue-100 text-blue-600"
                    : "bg-red-100 text-red-600"
                } p-4 rounded-lg w-fit`}
              >
                <div className="flex flex-row gap-4">
                  <div>
                    {/* <img src="" alt="" /> */}
                    <i className=" text-7xl fa fa-user"></i>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div>
                      <p className="text-3xl font-bold">{card.name}</p>
                      <p className="text-xl">{card.title}</p>
                    </div>
                  </div>
                </div>
                <div>{card.description}</div>
                <div>
                  {card.email.length > 0 && (
                    <div>
                      <i className="fa fa-envelope"></i> {card.email}
                    </div>
                  )}
                  {card.phone.length > 0 && (
                    <div>
                      <i className="fa fa-phone"></i> {card.phone}
                    </div>
                  )}
                  {card.location.length > 0 && (
                    <div>
                      <i className="fa fa-map-marker-alt"></i> {card.location}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {links && links.length > 0 && (
                    <div className="flex gap-2">
                      {links.map((link: link) => {
                        return (
                          <a
                            href={link.link}
                            target={"_blank"}
                            rel={"noreferrer"}
                          >
                            <i
                              className={`${link.icon} ${
                                card.color === "purple"
                                  ? "bg-purple-200 hover:bg-purple-300"
                                  : card.color === "blue"
                                  ? "bg-blue-200 hover:bg-blue-300"
                                  : "bg-red-200 hover:bg-red-300"
                              } hover:bg-purple-300 hover:scale-105 transition duration-300 rounded-full p-2`}
                            ></i>
                            
                          </a>

                        );
                        
                      })}
                      <i className="fa fa-print cursor-pointer flex items-center bg-red-100 hover:bg-red-200 transition duration-300 rounded-full p-2" 
                    onClick={()=>{
                      window.print();return false;
                      
                    }}
                    ></i>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
