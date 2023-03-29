import { PayloadAction } from "@reduxjs/toolkit";
import { MangaState, mangaReducer } from "./manga.slice";
import { Manga } from "../models/manga";

const mockManga: Manga = {
  author: "kentaro",
  category: "seinen",
  description: "berserk desc",
  firstChap: ["first chap"],
  id: "1",
  image: "image",
  name: "Berserk",
  price: 14,
};

const mockUpdateManga: Manga = {
  author: "kentaro-kun",
  category: "seinen",
  description: "berserk desc",
  firstChap: ["first chap"],
  id: "1",
  image: "image",
  name: "Berserk",
  price: 14,
};

const mockMangas: Manga[] = [
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
  {
    author: "kentaro Miura",
    category: "seinen",
    description: "berserk2 desc",
    firstChap: ["first2 chap"],
    id: "2",
    image: "image1",
    name: "Berserk 2",
    price: 15,
  },
];

const mockInitialState: MangaState = {
  manga: {} as Manga,
  mangas: [],
  mangaId: "",
};

const mockFullInitialState: MangaState = {
  manga: {} as Manga,
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
    {
      author: "kentaro Miura",
      category: "seinen",
      description: "berserk2 desc",
      firstChap: ["first2 chap"],
      id: "2",
      image: "image1",
      name: "Berserk 2",
      price: 15,
    },
  ],
  mangaId: "",
};

describe("Given the userSlice", () => {
  describe("When the getMangas method is called ", () => {
    test("Then at should use the getMangas method in the slice ", () => {
      const mockGetMangaAction: PayloadAction<Manga[]> = {
        type: "manga/getManga",
        payload: mockMangas,
      };
      const element = mangaReducer(mockInitialState, mockGetMangaAction);
      expect(element.mangas).toEqual(mockMangas);
    });
  });
  describe("When the getOneManga method is called ", () => {
    test("Then it should return a payload", () => {
      const mockGetOneManga: PayloadAction<Partial<Manga["id"]>> = {
        type: "manga/getOneManga",
        payload: "1",
      };
      const result = mangaReducer(mockFullInitialState, mockGetOneManga);
      expect(result.mangas[0]["id"]).toEqual(mockGetOneManga.payload);
    });
  });
  describe("When the createManga method is called ", () => {
    test("Then it should use the createManga method in the slice ", () => {
      const mockCreateMangaAction: PayloadAction<Partial<Manga>> = {
        type: "manga/createManga",
        payload: mockManga,
      };
      const element = mangaReducer(mockInitialState, mockCreateMangaAction);
      expect(element.mangas).toEqual([mockManga]);
    });
  });
  describe("When the UpdateManga method is called ", () => {
    test("Then it should use the UpdateManga method in the slice ", () => {
      const mockUpdateMangaAction: PayloadAction<Manga> = {
        type: "manga/updateManga",
        payload: mockUpdateManga,
      };
      const element = mangaReducer(mockFullInitialState, mockUpdateMangaAction);
      expect(element.manga).toEqual({});
    });
  });
  describe("When the DeleteManga method is called ", () => {
    test("Then it should use the DeleteManga method in the slice ", () => {
      const mockDeleteMangaAction: PayloadAction<Partial<Manga>> = {
        type: "manga/deleteManga",
        payload: mockManga,
      };
      const element = mangaReducer(mockInitialState, mockDeleteMangaAction);
      expect(element.mangas).toEqual([]);
    });
  });
  describe("When the setStateID method is called ", () => {
    test("Then it should use the DeleteManga method in the slice ", () => {
      const mockSetStateIDAction: PayloadAction<Partial<Manga>> = {
        type: "manga/setStateID",
        payload: { id: "ads" },
      };
      const element = mangaReducer(mockInitialState, mockSetStateIDAction);
      expect(element.mangas).toEqual([]);
    });
  });
});
