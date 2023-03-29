import { render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router";
import { store } from "../../store/store.js";
import { Provider } from "react-redux";
import { Header } from "./header.js";
import { Menu } from "../menu/menu.js";

describe("Given the ", () => {
  const mockMenu = [
    { label: "Home", path: "/home" },
    { label: "Login", path: "/login" },
    { label: "Register", path: "/register" },
  ];
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <Header>
            <Menu options={mockMenu}></Menu>
          </Header>
        </Router>
      </Provider>
    );
  });
  describe("When ", () => {
    test("Then it should ", () => {
      expect(screen.getByRole("list")).toBeInTheDocument;
    });
  });
});
