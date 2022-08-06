export type link = {
  link: string;
  icon: string;
  name: string;
  card?: Number;
};

export type publicLink = {
  link: string;
  user: number;
  icon: string;
  name: string;
  card?: Number;
};

export type card = {
  id: number;
  name: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  links: link[];
  color: string;
};

export type publicCard = {
  id: number;
  user: number;
  name: string;
  title: string;
  description: string;
  phone: string;
  email: string;
  location: string;
  links: link[];
  color: string;
};
