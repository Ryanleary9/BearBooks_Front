import { configureStore } from "@reduxjs/toolkit";
import { Manga } from "../models/manga";
import { UserStructure } from "../models/user";
import { mangaReducer } from "../reducers/manga.slice";
import { userReducer } from "../reducers/slice";

export const mockUsers = {
  loggedUser: {} as UserStructure,
  userLogged: {
    email: "asdadasd",
    passwd: "asdasdad",
    role: "admin",
    token: "asdadasd",
  },
  token: "",
  users: [],
};

export const mockUsersAdmin = {
  loggedUser: {
    email: "asdadasd",
    passwd: "asdasdad",
    role: "admin",
  } as UserStructure,
  userLogged: {
    token: "asdadasd",
  },
  token: "",
  users: [],
};
export const mockUsersUser = {
  loggedUser: {
    email: "asdadasd",
    passwd: "asdasdad",
    role: "user",
  } as UserStructure,
  userLogged: {
    token: "asdadasd",
  },
  token: "",
  users: [],
};

export const mockMangas = {
  mangas: [
    {
      author: "kentaro",
      category: "seinen",
      description: "berserk desc",
      firstChap: ["first chap"],
      id: "1",
      image: "image",
      name: "Berserk",
      price: 14,
    },
  ],
  manga: {} as Manga,
  mangaId: "1",
};

export const storeMockAdmin = configureStore({
  reducer: { mangas: mangaReducer, users: userReducer },
  preloadedState: { users: mockUsersAdmin, mangas: mockMangas },
});

export const storeMockUser = configureStore({
  reducer: { mangas: mangaReducer, users: userReducer },
  preloadedState: { users: mockUsersUser, mangas: mockMangas },
});

export const storeMock = configureStore({
  reducer: { mangas: mangaReducer, users: userReducer },
  preloadedState: { users: mockUsers, mangas: mockMangas },
});

export const storeMockError = configureStore({
  reducer: { mangas: mangaReducer, users: userReducer },
  preloadedState: {
    users: {
      loggedUser: {} as UserStructure,
      userLogged: null,
      token: "",
      users: [],
    },
    mangas: mockMangas,
  },
});
