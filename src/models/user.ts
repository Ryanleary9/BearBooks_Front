import { Manga } from "./manga";

export type UserStructure = {
  id: string;
  name?: string;
  surname?: string;
  email: string;
  passwd: string;
  pfp?: string;
  role?: string;
  kart?: Manga[];
  token?: string;
};

export type ServerResponse = {
  results: UserStructure[];
};
