import { UserStructure } from "../../models/user";

export interface Repo<U> {
  create(user: UserStructure, path: string): Promise<U>;
  kartActions(
    kart: Partial<UserStructure>,
    path: string,
    mangaID: string
  ): Promise<U>;
}
