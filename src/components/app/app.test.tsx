import { render, screen, act } from "@testing-library/react";
import { store } from "../../store/store.js";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app.js";

describe("Given the ", () => {
  test("Then it should ", async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={store}>
            <App></App>
          </Provider>
        </Router>
      );
    });

    expect(screen.getByAltText("Bear Books logo")).toBeInTheDocument();
  });
});
