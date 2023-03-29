import { AppRouter } from "../app.router/app.router";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import "./app.scss";
import { RootState } from "../../store/store";
import { useSelector } from "react-redux";
export type MenuOption = {
  label?: string;
  path: string;
};

export default function App() {
  const userRole = useSelector(
    (state: RootState) => state.users.loggedUser.role
  );
  let menuOptions: MenuOption[] = [];
  if (userRole === "admin") {
    menuOptions = [
      { label: "Home", path: "/home" },
      { label: "Add", path: "/add" },
    ];
  }
  if (userRole === "user") {
    menuOptions = [{ label: "Home", path: "/home" }];
  }
  if (userRole === undefined) {
    menuOptions = [
      { label: "Home", path: "/home" },
      { label: "Login", path: "/login" },
      { label: "Register", path: "/register" },
    ];
  }

  return (
    <div className="app">
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      <AppRouter />
    </div>
  );
}
