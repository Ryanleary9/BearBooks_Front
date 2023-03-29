import { MangaRepo } from "../../services/manga/manga.api.repo";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router-dom";
import { Provider } from "react-redux";
import Form from "./form";
import { configureStore } from "@reduxjs/toolkit";
import { mangaReducer } from "../../reducers/manga.slice";
import { userReducer } from "../../reducers/slice";
import { UserStructure } from "../../models/user";
import { Manga } from "../../models/manga";
import { useManga } from "../../hooks/manga/use.manga";
import { storeMockError } from "../../mocks/mocks";

const paramsMock = { id: "1" };

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
        loggedUser: {
          email: "asdadasd",
          passwd: "asdasdad",
          role: "admin",
        } as UserStructure,
        userLogged: { token: "asdadasd" },
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
      adminState: { userLogged: "asdadasd" },
      mangaState: {},
      //getMangas: jest.fn(),
      getMangaOne: jest.fn(),
      mangaCreate: jest.fn(),
      mangaUpdate: jest.fn(),
      mangaDelete: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={storeMock}>
          <Router>
            <Form prop={true}></Form>
          </Router>
        </Provider>
      );
    });
  });
  describe("When ", () => {
    test("Then it should ", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
    test("Then it should ", async () => {
      const data = await screen.findAllByRole("button");
      await fireEvent.click(data[0]);
      expect(useManga(repoMock).mangaCreate).toHaveBeenCalled();
    });
  });
});

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
      mangaState: { mangas: [{ name: "adsasd" }] },
      mangaCreate: jest.fn(),
      mangaUpdate: jest.fn().mockImplementation(async () => Promise.resolve()),
      mangaDelete: jest.fn(),
    });

    await act(async () => {
      render(
        <Provider store={storeMockError}>
          <Router>
            <Form prop={false}></Form>
          </Router>
        </Provider>
      );
    });
  });
  describe("When ", () => {
    test("Then it should ", () => {
      const element = screen.getByRole("button");
      expect(element).toBeInTheDocument();
    });
    test("Then it should ", async () => {
      const data = await screen.findAllByRole("button");
      await fireEvent.click(data[0]);
      expect(useManga(repoMock).mangaUpdate).toHaveBeenCalled();
    });
  });
});
