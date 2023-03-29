import { screen, render } from "@testing-library/react";
import { storeMock } from "../../mocks/mocks";
import EditManga from "./editManga";
import Form from "../form/form";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn().mockImplementation(() => ({})),
}));
describe("Given the ", () => {
  test("Then it should ", () => {
    render(
      <Provider store={storeMock}>
        <Router>
          <EditManga>
            <Form prop={false}></Form>
          </EditManga>
        </Router>
      </Provider>
    );

    const page = screen.getByText("EditManga");
    expect(page).toBeInTheDocument();
  });
});
