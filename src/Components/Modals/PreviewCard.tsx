import { Button, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import { getLinks } from "../../api/ApiUtils";
import { card, link } from "../../Common/DataType";

export default function PreviewCard(props: {
  card: card;
  onCloseCB: () => void;
}) {
  const { card } = props;
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState<link[]>([]);

  useEffect(() => {
    getLinks().then((datas) => {
      setLinks(
        datas.filter(
          (link: link) => Number(link.card) === Number(props.card.id)
        )
      );
      setLoading(false);
    });
  }, [props.card.id]);
  return (
    <div>
      {loading ? (
        <div className="flex justify-center items-center p-6">
          <CircularProgress color="secondary" />
        </div>
      ) : (
        <div
          className={`${
            card.color === "purple"
              ? "bg-purple-100 text-[#4c00b0]"
              : card.color === "blue"
              ? "bg-blue-100 text-blue-600"
              : "bg-red-100 text-red-600"
          } p-4 rounded-lg w-full`}
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
            {links.length > 0 && (
              <div className="flex gap-2">
                {links.map((link: link) => {
                  return (
                    <a href={link.link} target={"_blank"} rel={"noreferrer"}>
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
              </div>
            )}
          </div>
          <div className="flex justify-center">
            <Button
              color="secondary"
              variant="outlined"
              href={`/preview/${card.id}`}
            >
              Link
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
