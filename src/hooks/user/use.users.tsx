import { UserStructure } from "../../models/user.js";
import { login, register, saveUser } from "../../reducers/slice.js";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store/store.js";
import { newImage } from "../../firebase/firebase.user.js";
import { UserRepo } from "../../services/user/users.api.repo.js";

export function useUser(repo: UserRepo) {
  const users = useSelector((state: RootState) => state.users);
  const dispatch = useDispatch<AppDispatch>();

  const userLogin = async (info: Partial<UserStructure>) => {
    try {
      debugger;
      const data = await repo.create(info, "login");
      dispatch(saveUser(data.results[1]));
      dispatch(login(data.results[0]));
    } catch (error) {
      // console.log((error as Error).message);
    }
  };

  const userRegister = async (info: UserStructure, pfp: File) => {
    try {
      const imgUrl = await newImage(info, pfp);
      info.pfp = imgUrl;
      const data = await repo.create(info, "register");
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
