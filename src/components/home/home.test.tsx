import { findByRole, render, screen } from "@testing-library/react";
import { MemoryRouter as Router } from "react-router";
import { store } from "../../store/store";
import { Provider } from "react-redux";
import Home from "./home";
import { Card } from "../card/card";
import { Manga } from "../../models/manga";
import { act } from "react-dom/test-utils";
import { mangaReducer } from "../../reducers/manga.slice";
import { configureStore } from "@reduxjs/toolkit";
describe("Given the ", () => {
  beforeEach(async () => {
    const mockStore = configureStore({
      reducer: { mangas: mangaReducer },
      preloadedState: {
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

    act;
    await act(async () => {
      render(
        <Provider store={mockStore}>
          <Home></Home>
        </Provider>
      );
    });
  });
  describe("When ", () => {
    test("Then it should ", () => {
      expect(screen.getByRole("heading")).toBeInTheDocument;
    });
    test("should first", async () => {
      const mockManga: Manga = {
        author: "kentaro",
        category: "seinen",
        description: "berserk desc",
        firstChap: ["first chap"],
        id: "1",
        image: "image",
        name: "Berserk",
        price: 14,
      };

      act(() => {
        render(
          <Router>
            <Card key={mockManga.id} manga={mockManga}></Card>
          </Router>
        );
      });

      const name = await screen.findByText("Bear Books");
      expect(name).toBeInTheDocument();
    });
  });
});
