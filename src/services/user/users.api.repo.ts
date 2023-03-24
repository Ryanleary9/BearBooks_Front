import { ServerResponse, UserStructure } from "../../models/user";
import { Repo } from "./user.interface";

export class UserRepo implements Repo<ServerResponse> {
  url?: string;
  constructor() {
    this.url = "http://localhost:4500/users";
  }

  async loginUser(user: Partial<UserStructure>): Promise<ServerResponse> {
    const resp = await fetch(this.url + "/login", {
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

  async registerUser(user: UserStructure): Promise<ServerResponse> {
    const response = await fetch(this.url + "/register", {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-type": "application/json",
      },
    });

    if (!response.ok)
      throw new Error(`Error http: ${response.status} ${response.statusText}`);

    const data = (await response.json()) as ServerResponse;
    console.log("REPO", data);
    return data;
  }
}
