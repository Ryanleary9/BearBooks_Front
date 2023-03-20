import { UserStructure } from "../models/user";
import { UserRepo } from "../services/users.api.repo";
import { login, register } from "../reducers/slice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";

export function useUser(repo: UserRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const userLogin = async (info: Partial<UserStructure>) => {
    try {
      const data = await repo.loginUser(info);
      dispatch(login(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const userRegister = async (info: UserStructure) => {
    try {
      const data = await repo.registerUser(info);
      dispatch(register(data.results[0]));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  return {
    users,
    userLogin,
    userRegister,
  };
}
