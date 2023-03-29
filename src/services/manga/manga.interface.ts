import { Manga } from "../../models/manga.js";

export interface RepoManga<M> {
  getAllMangas(token: string): Promise<M>;
  getOneManga(token: string, mangaID: Manga["id"]): Promise<M>;
  createManga(token: string, manga: Partial<Manga>): Promise<M>;
  updateManga(
    token: string,
    mangaID: Manga["id"],
    manga: Partial<Manga>
  ): Promise<M>;
  deleteManga(token: string, mangaID: Manga["id"]): Promise<void>;
}
