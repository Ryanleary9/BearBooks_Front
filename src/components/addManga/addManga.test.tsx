import { screen, render } from "@testing-library/react";
import Form from "../form/form";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import AddManga from "./addManga";
import { storeMock } from "../../mocks/mocks";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
}));
describe("Given the ", () => {
  test("Then it should ", () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <AddManga>
            <Form prop={true}></Form>
          </AddManga>
        </Router>
      </Provider>
    );

    const page = screen.getByText("AddManga");
    expect(page).toBeInTheDocument();
  });
});
