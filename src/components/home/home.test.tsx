import { render, screen } from "@testing-library/react";
import Home from "./home";
import { act } from "react-dom/test-utils";
import { useManga } from "../../hooks/manga/use.manga";
import { Card } from "../card/card";

jest.mock("../../hooks/manga/use.manga");
jest.mock("../card/card");

describe("Given the ", () => {
  beforeEach(async () => {
    (useManga as jest.Mock).mockReturnValue({
      mangaState: {
        mangas: [{}],
        mangaId: "1",
      },
      getMangas: jest.fn(),
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
      expect(Card).toHaveBeenCalled();
    });
  });
});
