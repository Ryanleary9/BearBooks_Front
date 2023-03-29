import { render, screen } from "@testing-library/react";
import { AppRouter } from "./app.router";
import { MemoryRouter as Router } from "react-router-dom";
import { MenuOption } from "../app/app";
import { store } from "../../store/store";
import { Provider } from "react-redux";

const mockOptions: MenuOption[] = [
  {
    label: "Home",
    path: "/home",
  },
  {
    label: "Login",
    path: "/login",
  },
  {
    label: "Register",
    path: "/register",
  },
  {
    label: "Add",
    path: "/add",
  },
];

describe("Given AppRouter", () => {
  describe("When the route is home", () => {
    test("Then we should navigate to home", async () => {
      render(
        <Provider store={store}>
          <Router initialEntries={["/home"]} initialIndex={0}>
            <AppRouter menuOptions={mockOptions}></AppRouter>
          </Router>
        </Provider>
      );
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When the route is login", () => {
    test("Then we should navigate to login", async () => {
      render(
        <Provider store={store}>
          <Router initialEntries={["/login"]} initialIndex={0}>
            <AppRouter menuOptions={mockOptions}></AppRouter>
          </Router>
        </Provider>
      );
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When the route is register", () => {
    test("Then we should navigate to register", async () => {
      render(
        <Provider store={store}>
          <Router initialEntries={["/register"]} initialIndex={0}>
            <AppRouter menuOptions={mockOptions}></AppRouter>
          </Router>
        </Provider>
      );
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When the route is Add manga", () => {
    test("Then we should navigate to Add manga", async () => {
      render(
        <Provider store={store}>
          <Router initialEntries={["/add"]} initialIndex={0}>
            <AppRouter menuOptions={mockOptions}></AppRouter>
          </Router>
        </Provider>
      );
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
