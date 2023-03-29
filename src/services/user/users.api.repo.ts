import { ServerResponse, UserStructure } from "../../models/user.js";
import { Repo } from "./user.interface.js";

export class UserRepo implements Repo<ServerResponse> {
  url?: string;
  constructor() {
    this.url = "http://localhost:4500/users";
  }

  async create(
    user: Partial<UserStructure>,
    path: string
  ): Promise<ServerResponse> {
    const url = this.url + "/" + path;

    const resp = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = (await resp.json()) as ServerResponse;
    return data;
  }

  async kartActions(
    kart: Partial<UserStructure>,
    path: string,
    mangaID: string
  ): Promise<ServerResponse> {
    const url = this.url + "/" + path + "/" + mangaID;

    const resp = await fetch(url, {
      method: "PATCH",
      body: JSON.stringify(kart),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!resp.ok)
      throw new Error(`Error http: ${resp.status} ${resp.statusText}`);

    const data = (await resp.json()) as ServerResponse;
    return data;
  }
}
