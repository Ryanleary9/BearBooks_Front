import { render, screen } from "@testing-library/react";
import { AppRouter } from "./app.router";
import { MemoryRouter as Router } from "react-router-dom";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import { MenuOption } from "../app/app";

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
  const mockRouter = (prop: string) => {
    render(
      <Provider store={store}>
        <Router initialEntries={[prop]} initialIndex={0}>
          <AppRouter></AppRouter>
        </Router>
      </Provider>
    );
  };
  describe("When the route is home", () => {
    test("Then we should navigate to home", async () => {
      mockRouter("/home");
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When the selected route is login", () => {
    test("Then it should take us to login", async () => {
      mockRouter("/login");
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
  describe("When route is register", () => {
    test("Then we will navigate to register", async () => {
      mockRouter("/register");
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });

  describe("When we select thr route Add manga", () => {
    test("Then we should go to Add manga page", async () => {
      mockRouter("/add");
      const element = await screen.findByRole("heading");
      expect(element).toBeInTheDocument();
    });
  });
});
