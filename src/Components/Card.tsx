import { Button, CircularProgress, TextField } from "@mui/material";
import { navigate } from "raviger";
import { useEffect, useState } from "react";
import {
  getCards,
  getLinks,
  postCards,
  postLinks,
  updateCard,
  updateLinks,
} from "../api/ApiUtils";
import ColorRadioButton from "../Common/ColorRadioButton";
import { link } from "../Common/DataType";
import Header from "../Common/Header";
import SocialMediaDropDown from "../Common/SocialMediaDropDown";

export default function Card(props: { type: string; id: number }) {
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [color, setColor] = useState("purple");
  const [phone, setPhone] = useState("");
  const [location, setLocation] = useState("");
  const [links, setLinks] = useState<link[]>([]);
  const [href, setHref] = useState("");
  const [linkIcon, setLinkIcon] = useState("");
  const [linkName, setLinkName] = useState("");
  const [showAddLink, setShowAddLink] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    if (props.type === "create") {
      postCards(name, title, description, email, phone, location, color).then(
        () => {
          // getting the current card id
          getCards().then((data) => {
            const cardId = data[data.length - 1].id;
            // uploading the links for current card
            links.forEach((link) => {
              postLinks(link.name, link.icon, link.link, cardId).then(() => {
                setLoading(false);
                navigate("/home");
              });
            });
          });
        }
      );
    } else {
      updateCard(
        name,
        title,
        description,
        email,
        phone,
        location,
        color,
        props.id.toString()
      ).then(() => {
        links.forEach((link) => {
          if (link.id) {
            updateLinks(
              link.id.toString(),
              link.name,
              link.icon,
              link.link,
              props.id.toString()
            );
          } else {
            postLinks(link.name, link.icon, link.link, props.id);
          }
        });
        setLoading(false);
        navigate("/home");
      });
    }
  };

  const removeLink = (href: string) => {
    setLinks(links.filter((link) => link.link !== href));
  };

  const addLink = () => {
    const link = { name: linkName, link: href, icon: linkIcon };
    setLinks([...links, link]);
    console.log(links);
    setHref("");
    setLinkIcon("");
    setLinkName("");
    setShowAddLink(false);
  };

  useEffect(() => {
    if (props.type === "edit") {
      getCards().then((data) => {
        const card = data.filter((card: any) => card.id === props.id)[0];
        setName(card.name);
        setTitle(card.title);
        setDescription(card.description);
        setEmail(card.email);
        setColor(card.color);
        setPhone(card.phone);
        setLocation(card.location);
        getLinks().then((linkData) => {
          setLinks(linkData.filter((link: any) => link.card === props.id));
        });
      });
    }

    document.title = "Create Card | Bizz Card";
  }, [props.id, props.type]);

  return (
    <div>
      <Header tab={"Home"} />
      <div className="p-4 text-[#4c00b0]">
        <p className="text-gray-500 text-4xl">{`${
          props.type === "create" ? "Create new" : "Edit"
        } card`}</p>
        <div className="pt-6 flex justify-center gap-12">
          <div className="flex flex-col md:flex-row gap-6">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <TextField
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Name"
                      fullWidth
                      label="Name"
                      disabled={loading}
                    ></TextField>
                  </div>
                  <div>
                    <TextField
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      label="Title"
                      placeholder="Title"
                      disabled={loading}
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      label="Description"
                      placeholder="Description"
                      disabled={loading}
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      label="Email"
                      placeholder="Email"
                      disabled={loading}
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      label="Phone"
                      placeholder="Phone"
                      disabled={loading}
                      fullWidth
                    />
                  </div>
                  <div>
                    <TextField
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      label="Location"
                      placeholder="Location"
                      disabled={loading}
                      fullWidth
                    />
                  </div>
                </div>
                <div>
                  <ColorRadioButton setColor={(e) => setColor(e)} />
                </div>
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row justify-between gap-2">
                    <p>Social Media Links:</p>
                    <div>
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => setShowAddLink(true)}
                      >
                        <i className="fa fa-add"></i>&nbsp;Add new link
                      </Button>
                    </div>
                  </div>
                  {links.length > 0 &&
                    links.map((link: link) => (
                      <div className="flex justify-between">
                        <div>
                          <i className={link.icon}></i> {link.name}
                        </div>
                        <i
                          onClick={() => removeLink(link.link)}
                          className="fa fa-remove text-red-500 cursor-pointer"
                        ></i>
                      </div>
                    ))}
                  {showAddLink && (
                    <div className="flex flex-col gap-2">
                      <div className="flex flex-col md:flex-row justify-between gap-2">
                        <TextField
                          value={href}
                          onChange={(e) => setHref(e.target.value)}
                          label="Link"
                          placeholder="Link"
                          fullWidth
                        />
                        <div className="flex items-center">
                          <SocialMediaDropDown
                            setLinkName={(e) => setLinkName(e)}
                            setLinkIcon={(e) => setLinkIcon(e)}
                          />
                        </div>
                      </div>
                      <div className="pt-6 flex justify-center">
                        <Button
                          fullWidth
                          disabled={
                            linkName === "Type" ||
                            linkIcon.length === 0 ||
                            href.length === 0
                          }
                          variant="outlined"
                          color="secondary"
                          onClick={() => addLink()}
                        >
                          Add
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex justify-center items-center pt-4">
                {loading ? (
                  <div>
                    <CircularProgress color="secondary" />
                  </div>
                ) : (
                  <div className="flex flex-col md:flex-row justify-between gap-2 w-full">
                    <Button
                      onClick={() => navigate("/home")}
                      variant="contained"
                      fullWidth
                      style={{ backgroundColor: "gray", color: "white" }}
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      {props.type === "create" ? "Create & Publish" : "Update"}
                    </Button>
                  </div>
                )}
              </div>
            </form>
            <div>
              <div
                className={`${
                  color === "purple"
                    ? "bg-purple-100"
                    : color === "blue"
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
                      <p className="text-3xl font-bold">{name}</p>
                      <p className="text-xl">{title}</p>
                    </div>
                  </div>
                </div>
                <div>{description}</div>
                <div>
                  {email.length > 0 && (
                    <div>
                      <i className="fa fa-envelope"></i> {email}
                    </div>
                  )}
                  {phone.length > 0 && (
                    <div>
                      <i className="fa fa-phone"></i> {phone}
                    </div>
                  )}
                  {location.length > 0 && (
                    <div>
                      <i className="fa fa-map-marker-alt"></i> {location}
                    </div>
                  )}
                </div>
                <div className="flex gap-2">
                  {links.length > 0 && (
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
                                color === "purple"
                                  ? "bg-purple-200 hover:bg-purple-300"
                                  : color === "blue"
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
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
