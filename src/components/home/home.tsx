import { useEffect, useMemo } from "react";
import "./home.scss";
import { MangaRepo } from "../../services/manga/manga.api.repo.js";
import { useManga } from "../../hooks/manga/use.manga.js";
import { Manga } from "../../models/manga.js";
import { Card } from "../card/card.js";
export type CardProps = { children: JSX.Element };

export default function Home() {
  const mangaRepo = useMemo(() => new MangaRepo(), []);

  const { getMangas, mangaState } = useManga(mangaRepo);

  useEffect(() => {
    getMangas();
  }, [getMangas]);

  return (
    <>
      <span className="home-page">
        <h1 className="home-title">Bear Books</h1>
        <ul className="cards">
          {mangaState.mangas.map((item: Manga) => (
            <Card key={item.id} manga={item}></Card>
          ))}
        </ul>
      </span>
    </>
  );
}
