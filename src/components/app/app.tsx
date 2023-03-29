import { AppRouter } from "../app.router/app.router";
import { Header } from "../header/header";
import { Menu } from "../menu/menu";
import "./app.scss";
export type MenuOption = {
  label?: string;
  path: string;
};
export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
  { label: "Add", path: "/add" },
];
export default function App() {
  return (
    <div className="app">
      <Header>
        <Menu options={menuOptions}></Menu>
      </Header>
      {/* <AppRouter menuOptions={menuOptions} /> */}
      <AppRouter />
    </div>
  );
}
