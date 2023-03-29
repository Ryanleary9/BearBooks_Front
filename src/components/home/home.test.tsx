import { render, screen } from "@testing-library/react";
import Home from "./home";
import { act } from "react-dom/test-utils";
import { useManga } from "../../hooks/manga/use.manga";
import { Card } from "../card/card";

// jest.mock("react", () => ({
//   ...jest.requireActual("react"),
//   useMemo: jest.fn((fn) => fn()),
// }));

jest.mock("../../hooks/manga/use.manga");
jest.mock("../card/card");

// jest.mock("react-redux", () => ({
//   ...jest.requireActual("react-redux"),
//   useSelector: jest.fn(),
// }));

describe("Given the ", () => {
  // const repoMock = {
  //   getAllMangas: jest.fn(),
  //   getOneManga: jest.fn(),
  //   createManga: jest.fn(),
  //   updateManga: jest.fn(),
  //   deleteManga: jest.fn(),
  // } as unknown as MangaRepo;

  // (useSelector as jest.Mock).mockReturnValue(() => ({
  //   mangas: {
  //     mangas: [
  //       {
  //         author: "kentaro",
  //         category: "seinen",
  //         description: "berserk desc",
  //         firstChap: ["first chap"],
  //         id: "1",
  //         image: "image",
  //         name: "Berserk",
  //         price: 14,
  //       },
  //     ],
  //     manga: {} as Manga,
  //     mangaId: "1",
  //   },
  // }));

  beforeEach(async () => {
    (useManga as jest.Mock).mockReturnValue({
      mangaState: {
        mangas: [
          {
            // author: "kentaro",
            // category: "seinen",
            // description: "berserk desc",
            // firstChap: ["first chap"],
            // id: "1",
            // image: "image",
            // name: "Berserk",
            // price: 14,
          },
        ],
        mangaId: "1",
      },
      getMangas: jest.fn(),
      // getMangaOne: jest.fn(),
      // mangaCreate: jest.fn(),
      // mangaUpdate: jest.fn(),
      // mangaDelete: jest.fn(),
    });

    await act(async () => {
      render(<Home />);
    });
  });
  describe("When ", () => {
    test("Then it should ", () => {
      expect(screen.getByRole("heading")).toBeInTheDocument;
    });
    test("should first", async () => {
      // const mockManga: Manga = {
      //   author: "kentaro",
      //   category: "seinen",
      //   description: "berserk desc",
      //   firstChap: ["first chap"],
      //   id: "1",
      //   image: "image",
      //   name: "Berserk",
      //   price: 14,
      // };

      // act(() => {
      //   render(
      //     <Router>
      //       <Card manga={mockManga}></Card>
      //     </Router>
      //   );
      // });

      //const name = await screen.findByText("Berserk");
      //expect(name).toBeInTheDocument();
      expect(Card).toHaveBeenCalled();
    });
  });
});
