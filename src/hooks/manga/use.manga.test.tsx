import { act, render, screen } from "@testing-library/react";
import { Manga } from "../../models/manga";
import { useManga } from "./use.manga";
import { configureStore } from "@reduxjs/toolkit";
import { mangaReducer } from "../../reducers/manga.slice";
import { Provider, useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { userReducer } from "../../reducers/slice";
import { MangaRepo } from "../../services/manga/manga.api.repo";
import { UserStructure } from "../../models/user";

jest.mock("../../firebase/firebase.manga");
jest.mock("../../reducers/slice", () => ({
  getOneManga: jest.fn(),
  setStateID: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

describe("Given the ", () => {
  let payloadMock: Manga;
  let payloadMockUpdate: Partial<Manga>;
  let repoMock: MangaRepo;
  const getOneMangaMock = [
    {
      author: "kentaro-kun",
      category: "seinen",
      description: "berserk desc",
      firstChap: ["first chap"],
      id: "2",
      image: "image",
      name: "Berserk",
      price: 14,
    },
  ];

  repoMock = {
    getAllMangas: jest.fn(),
    getOneManga: jest.fn().mockReturnValue(getOneMangaMock),
    createManga: jest.fn(),
    updateManga: jest.fn(),
    deleteManga: jest.fn(),
  } as unknown as MangaRepo;
  beforeEach(async () => {
    payloadMock = {
      author: "kentaro-kun",
      category: "seinen",
      description: "berserk desc",
      firstChap: ["first chap"],
      id: "2",
      image: "image",
      name: "Berserk",
      price: 14,
    } as unknown as Manga;

    payloadMockUpdate = {
      author: "kentaro-kun",
    };
    (useSelector as jest.Mock).mockReturnValue({
      users: {
        loggedUser: {} as UserStructure,
        userLogged: {},
        token: "",
        users: [],
      },
      mangas: {
        mangas: [],
        manga: {} as Manga,
        mangaId: "",
      },
    });

    const file = new File([""], "filename.jpg", { type: "image/jpeg" });

    const TestComponent = function () {
      const { getMangaOne, getMangas, mangaCreate, mangaDelete, mangaUpdate } =
        useManga(repoMock);

      return (
        <div className="buttoncontainer">
          <button title="getAllMangasButton" onClick={() => getMangas()}>
            Get All mangas
          </button>
          <button title="getoneMangasButton" onClick={() => getMangaOne("1")}>
            Get All mangas
          </button>
          <button
            title="createMangabutton"
            onClick={() => mangaCreate(payloadMock, "asdadasd", file)}
          >
            add
          </button>
          <button
            title="deleteMangabutton"
            onClick={() => mangaDelete("asdas", "1")}
          >
            del
          </button>
          <button
            title="updateMangabutton"
            onClick={() => mangaUpdate("asdadasd", "1", payloadMockUpdate)}
          >
            update
          </button>
        </div>
      );
    };

    await act(async () => {
      render(<TestComponent />);
    });
  });
  describe("When test is loaded ", () => {
    test("Then it should render test component", async () => {
      const component = await screen.findAllByRole("button");
      expect(component[0]).toBeInTheDocument();
      expect(component[1]).toBeInTheDocument();
      expect(component[2]).toBeInTheDocument();
      expect(component[3]).toBeInTheDocument();
      expect(component[4]).toBeInTheDocument();
    });
  });
  describe("When the GetAllMangas method called", () => {
    test("Then it should use GetAllMangas method", async () => {
      const component = await screen.findAllByRole("button");
      await act(async () => userEvent.click(component[0]));
      expect(repoMock.getAllMangas).toHaveBeenCalled();
    });
  });
  describe("When the GetOneMangas method called", () => {
    test("Then it should use GetOneMangas method", async () => {
      const component = await screen.findAllByRole("button");
      await act(async () => userEvent.click(component[1]));
      expect(repoMock.getOneManga).toHaveBeenCalled();
    });
  });
  describe("When the createManga method called", () => {
    test("Then it should use createManga method", async () => {
      const component = await screen.findAllByRole("button");
      await userEvent.click(component[2]);
      expect(repoMock.createManga).toHaveBeenCalled();
    });
  });
  describe("When the deleteManga method called", () => {
    test("Then it should use deleteManga method", async () => {
      const component = await screen.getByText(/del/i);
      await act(async () => userEvent.click(component));
      expect(repoMock.deleteManga).toHaveBeenCalled();
    });
  });
  describe("When the register mehtod is called", () => {
    test("Then it should use register method", async () => {
      const component = await screen.getByText(/update/i);
      await act(async () => userEvent.click(component));
      expect(repoMock.updateManga).toHaveBeenCalled();
    });
  });
});
