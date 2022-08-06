export type link = {
  link: string;
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
