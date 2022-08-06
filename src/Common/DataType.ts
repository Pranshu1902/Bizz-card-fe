export type link = {
  href: string;
  icon: string;
  name: string;
};

export type card = {
  id: number;
  name: string;
  title: string;
  description: string;
  links: link[];
};
