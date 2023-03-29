import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.js";
import {
  createManga,
  deleteManga,
  getManga,
  getOneManga,
  setStateID,
  updateManga,
} from "../../reducers/manga.slice.js";
import { Manga } from "../../models/manga.js";
import { MangaRepo } from "../../services/manga/manga.api.repo.js";
import { newMangaImage } from "../../firebase/firebase.manga.js";
import { useCallback } from "react";

export function useManga(repo: MangaRepo) {
  const adminState = useSelector((state: RootState) => state.users);
  const mangaState = useSelector((state: RootState) => state.mangas);
  const dispatch = useDispatch<AppDispatch>();

  const getMangas = useCallback(async () => {
    try {
      const mangas = await repo.getAllMangas();
      dispatch(getManga(mangas.results));
    } catch (error) {
      console.log((error as Error).message);
    }
  }, [dispatch]);

  const getMangaOne = async (mangaID: Manga["id"]) => {
    try {
      if (!mangaID) throw new Error("Manga ID is undefined");
      const idManga = await repo.getOneManga(mangaID);
      dispatch(getOneManga(idManga.results[0].id));
      dispatch(setStateID(idManga.results[0].id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const mangaCreate = async (manga: Manga, token: string, image: File) => {
    try {
      console.log("MANGA PARAMS", manga);

      if (!token) throw new Error("Not Authorized");
      const portada = await newMangaImage(manga, image);
      manga.image = portada;

      const newManga = await repo.createManga(token, manga);
      console.log("HOOK NewManga", newManga);
      dispatch(createManga(newManga.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const mangaUpdate = async (
    token: string,
    mangaId: Manga["id"],
    manga: Partial<Manga>
  ) => {
    try {
      if (!mangaId) throw new Error("Manga ID is undefined");
      console.log(token);
      const mangaData = await repo.updateManga(token, mangaId, manga);
      console.log("MANGA DATA", mangaData);
      dispatch(updateManga(mangaData.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const mangaDelete = async (token: string, mangaId: Manga["id"]) => {
    try {
      if (!mangaId) throw new Error("Manga ID is undefined");
      await repo.deleteManga(token, mangaId);
      dispatch(deleteManga(mangaId));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    adminState,
    mangaState,
    getMangas,
    getMangaOne,
    mangaCreate,
    mangaUpdate,
    mangaDelete,
  };
}
