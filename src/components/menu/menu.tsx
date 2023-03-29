import { MenuOption } from "../app/app";
import { Link } from "react-router-dom";
import "./menu.scss";

type MenuProps = {
  options: MenuOption[];
};

type ExtraProps = {
  extraOptions: MenuOption[];
};

export const Menu = ({ options }: MenuProps) => {
  return (
    <>
      <nav>
        <div>
          <ul className="menu_list">
            {options.map((item) => (
              <li key={item.label}>
                <Link to={item.path} className="menu-list_routes">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </>
  );
};
