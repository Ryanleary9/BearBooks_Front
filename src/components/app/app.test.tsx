import { render, screen } from "@testing-library/react";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./App";

describe("Given the ", () => {
  test("Then it should ", async () => {
    render(
      <Router>
        <Provider store={store}>
          <App></App>
        </Provider>
      </Router>
    );

    expect(screen.getByRole("heading")).toBeInTheDocument();
  });
});
