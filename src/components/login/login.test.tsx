import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import Login from "./login";
describe("Given the login component", () => {
  beforeEach(async () => {
    render(
      <Provider store={store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
  });
  describe("When it loads properly ", () => {
    test("Then it should ", async () => {
      const button = screen.getByRole("button");
      await fireEvent.click(button);
    });
  });
});
