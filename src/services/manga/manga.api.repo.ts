import { Manga, MangaServerResponse } from "../../models/manga";
import { RepoManga } from "./manga.interface";

export class MangaRepo implements RepoManga<MangaServerResponse> {
  url: string;
  constructor() {
    this.url = "https://bearbooks-final-project.onrender.com/manga";
  }

  async getAllMangas(): Promise<MangaServerResponse> {
    const url = this.url + "/list";

    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const mangaData = (await resp.json()) as MangaServerResponse;
    return mangaData;
  }

  async getOneManga(mangaID: string): Promise<MangaServerResponse> {
    const url = this.url + "/list/" + mangaID;

    const resp = await fetch(url, {
      method: "GET",
      headers: { Authorization: "Bearer" },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const mangaData = (await resp.json()) as MangaServerResponse;
    return mangaData;
  }

  async createManga(token: string, manga: Manga): Promise<MangaServerResponse> {
    const url = this.url + "/add";

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(manga),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    const mangaData = (await resp.json()) as MangaServerResponse;
    return mangaData;
  }

  async updateManga(
    token: string,
    mangaID: string,
    manga: Partial<Manga>
  ): Promise<MangaServerResponse> {
    const url = this.url + "/update/" + mangaID;
    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(manga),
      headers: {
        "Content-type": "application/json",
        Authorization: "Bearer " + token,
      },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);

    const mangaData = (await resp.json()) as MangaServerResponse;
    return mangaData;
  }

  async deleteManga(token: string, mangaID: string): Promise<void> {
    const url = this.url + "/delete/" + mangaID;

    const resp = await fetch(url, {
      method: "DELETE",
      headers: { Authorization: "Bearer " + token },
    });

    if (!resp.ok)
      throw new Error("Error http: " + resp.status + resp.statusText);
  }
}
