import { render, screen, act } from "@testing-library/react";
import { store } from "../../store/store";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import App from "./app";
import { storeMock, storeMockAdmin, storeMockUser } from "../../mocks/mocks";

describe("Given the ", () => {
  const mockStore = storeMock;
  const mockStoreAdmin = storeMockAdmin;
  const mockStoreUser = storeMockUser;
  test("Then it should ", async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={mockStore}>
            <App></App>
          </Provider>
        </Router>
      );
    });

    expect(screen.getByAltText("Bear Books logo")).toBeInTheDocument();
  });
  test("Then it should ", async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={mockStoreAdmin}>
            <App></App>
          </Provider>
        </Router>
      );
    });

    expect(screen.getByAltText("Bear Books logo")).toBeInTheDocument();
  });

  test("Then it should ", async () => {
    await act(async () => {
      render(
        <Router>
          <Provider store={mockStoreUser}>
            <App></App>
          </Provider>
        </Router>
      );
    });

    expect(screen.getByAltText("Bear Books logo")).toBeInTheDocument();
  });
});
