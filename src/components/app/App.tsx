import Login from "../login/login";

export type MenuOption = {
  label: string;
  path: string;
};

export const menuOptions: MenuOption[] = [
  { label: "Home", path: "/home" },
  { label: "Login", path: "/login" },
  { label: "Register", path: "/register" },
  { label: "Favorites", path: "/favorites" },
];
export default function App() {
  return (
    <div className="App">
      <Login></Login>
    </div>
  );
}
