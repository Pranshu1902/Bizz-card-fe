const baseURL = "https://bizz-card-api.herokuapp.com/";
// const baseURL = "http://127.0.0.1:8000/";

type methods = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

// main request function
const request: any = async (
  method: methods = "GET",
  data: any = {},
  endpoint: string
) => {
  let url;
  let payload: string;

  if (method === "GET") {
    const requestParams = data
      ? `?${Object.keys(data)
          .map((key) => `${key}=${data[key]}`)
          .join("&")}`
      : "";
    url = `${baseURL}${endpoint}${requestParams}`;
    payload = "";
  } else {
    url = `${baseURL}${endpoint}`;
    payload = data ? JSON.stringify(data) : "";
  }

  // Token Authentication
  const token = localStorage.getItem("token");
  const auth = token ? "Token " + localStorage.getItem("token") : "";

  try {
    const response = await fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json", Authorization: auth },
      body: method !== "GET" ? payload : null,
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      const errorJson = await response.json();
      throw Error(errorJson);
    }
  } catch (error) {
    return error;
  }
};

export const getUsersCount = async () => {
  return request("GET", {}, "user/");
};

export const login = async (username: string, password: string) => {
  const data = { username: username, password: password };
  return request("POST", data, "api-token-auth/");
};

export const signup = async (username: string, password: string) => {
  const data = { username: username, password: password };
  return request("POST", data, "user/");
};

export const me = async () => {
  return request("GET", {}, "api/user/");
};

export const getCards = async () => {
  return request("GET", {}, "card/");
};

export const postCards = async (
  name: string,
  title: string,
  description: string,
  email: string,
  phone: string,
  location: string,
  color: string
) => {
  const data = {
    name: name,
    title: title,
    description: description,
    email: email,
    phone: phone,
    location: location,
    color: color,
  };
  return request("POST", data, "card/");
};

export const updateCard = async (
  name: string,
  title: string,
  description: string,
  email: string,
  phone: string,
  location: string,
  color: string,
  cardId: string
) => {
  const data = {
    name: name,
    title: title,
    description: description,
    email: email,
    phone: phone,
    location: location,
    color: color,
  };
  return request("PUT", data, `card/${cardId}/`);
};

export const deleteCard = async (id: number) => {
  return request("DELETE", {}, `card/${id}/`);
};

export const getLinks = async () => {
  return request("GET", {}, "link/");
};

export const postLinks = async (
  name: string,
  icon: string,
  link: string,
  cardId: Number
) => {
  const data = { name: name, icon: icon, link: link, card: cardId };
  return request("POST", data, "link/");
};

export const updateLinks = async (
  id: string,
  name: string,
  icon: string,
  link: string,
  cardId: string
) => {
  const data = { name: name, icon: icon, link: link, card: cardId };
  return request("PUT", data, `link/${id}/`);
};

export const getPublicCards = async () => {
  return request("GET", {}, "public/card/");
};

export const getPublicLinks = async () => {
  return request("GET", {}, "public/link/");
};

export const updateProfile = async (
  id: number,
  username: string,
  password: string
) => {
  const data = { username: username, password: password };
  return request("PUT", data, `user/${id}/`);
};
