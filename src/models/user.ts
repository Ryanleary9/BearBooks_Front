import { Manga } from "./manga.js";

type Role = "user" | "admin";

export type UserStructure = {
  id?: string;
  name?: string;
  surname?: string;
  email: string;
  passwd: string;
  pfp?: string;
  role?: Role;
  kart?: Manga[];
  token?: string;
};

export type ServerResponse = {
  results: UserStructure[];
};
