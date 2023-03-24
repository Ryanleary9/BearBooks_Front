import { UserStructure } from "../../models/user";

export interface Repo<U> {
  loginUser(info: Partial<UserStructure>): Promise<U>;
  registerUser(info: UserStructure): Promise<U>;
}
