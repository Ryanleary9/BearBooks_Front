import { configureStore } from "@reduxjs/toolkit";
import { Manga } from "../../models/manga";
import { UserStructure } from "../../models/user.js";
import { mangaReducer } from "../../reducers/manga.slice.js";
import { userReducer } from "../../reducers/slice.js";
import { MangaRepo } from "../../services/manga/manga.api.repo.js";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { useManga } from "../../hooks/manga/use.manga.js";
import { Provider } from "react-redux";
import { MemoryRouter as Router } from "react-router-dom";
import Details from "./details.js";

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

  const storeMock = configureStore({
    reducer: { mangas: mangaReducer, users: userReducer },
    preloadedState: {
      users: {
        loggedUser: {} as UserStructure,
        userLogged: {
          email: "asdadasd",
          passwd: "asdasdad",
          role: "admin",
          token: "asdadasd",
        },
        token: "",
        users: [],
      },
      mangas: {
        mangas: [
          {
            author: "kentaro",
            category: "seinen",
            description: "berserk desc",
            firstChap: ["first chap"],
            id: "1",
            image: "image",
            name: "Berserk",
            price: 14,
          },
        ],
        manga: {} as Manga,
        mangaId: "1",
      },
    },
  });

  beforeEach(async () => {
    (useManga as jest.Mock).mockReturnValue({
      //adminState : {},
      mangaState: {
        mangas: [
          {
            author: "kentaro",
            category: "seinen",
            description: "berserk desc",
            firstChap: ["first chap"],
            id: "1",
            image: "image",
            name: "Berserk",
            price: 14,
          },
        ],
        mangaId: "1",
      },
      //getMangas: jest.fn(),
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
