import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Manga } from "../models/manga.js";

export type MangaState = {
  mangas: Manga[];
  manga: Manga;
  mangaId: Manga["id"];
};

const initialState: MangaState = {
  mangas: [],
  manga: {} as Manga,
  mangaId: "",
};

export const mangaSlice = createSlice({
  name: "manga",
  initialState,
  reducers: {
    getManga(state, action: PayloadAction<Manga[]>) {
      state.mangas = action.payload;
    },
    getOneManga(state, action: PayloadAction<Partial<Manga["id"]>>) {
      const mangaData = [...state.mangas];
      state.mangas = mangaData.filter((item) => item.id === action.payload);
    },
    createManga(state, action: PayloadAction<Manga>) {
      state.mangas = [...state.mangas, action.payload];
    },
    updateManga(state, action: PayloadAction<Partial<Manga>>) {
      const actualData = [...state.mangas];
      state.mangas = actualData.map((item) =>
        item.id === action.payload.id ? { ...item, ...action.payload } : item
      );
    },
    deleteManga(state, action: PayloadAction<Manga["id"]>) {
      const mangaData = [...state.mangas];
      state.mangas = mangaData.filter((item) => item.id !== action.payload);
    },
    setStateID(state, action: PayloadAction<Manga["id"]>) {
      state.mangaId = action.payload;
    },
  },
});

export const {
  getManga,
  getOneManga,
  createManga,
  updateManga,
  deleteManga,
  setStateID,
} = mangaSlice.actions;

export const mangaReducer = mangaSlice.reducer;
