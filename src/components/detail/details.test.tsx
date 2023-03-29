import { MangaRepo } from "../../services/manga/manga.api.repo";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useManga } from "../../hooks/manga/use.manga";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import Details from "./details";
import { mockMangas, storeMock } from "../../mocks/mocks";

let paramsMock = { id: "1" };

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useParams: () => paramsMock,
}));

jest.mock("../../hooks/manga/use.manga");

describe("Given the ", () => {
  const repoMock = {
    getAllMangas: jest.fn(),
    getOneMangas: jest.fn(),
    createMangas: jest.fn(),
    updateMangas: jest.fn(),
    deleteMangas: jest.fn(),
  } as unknown as MangaRepo;

  beforeEach(async () => {
    (useManga as jest.Mock).mockReturnValue({
      mangaState: mockMangas,
      getMangaOne: jest.fn(),
      mangaCreate: jest.fn(),
      mangaUpdate: jest.fn(),
      mangaDelete: jest.fn().mockImplementation(async () => Promise.resolve()),
    });

    await act(async () => {
      render(
        <Provider store={storeMock}>
          <Router>
            <Details></Details>
          </Router>
        </Provider>
      );
    });
  });

  test("Then it should ", async () => {
    const data = await screen.findByAltText("Berserk");
    expect(data).toBeInTheDocument();
  });
  test("Then it should ", async () => {
    const data = await screen.findByText(/Delete/i);
    await fireEvent.click(data);
    expect(useManga(repoMock).mangaDelete).toHaveBeenCalled();
  });
});
