import { Link } from "react-router-dom";
import { Manga } from "../../models/manga.js";
import "./card.scss";

export type CardProps = {
  manga: Manga;
};

export function Card({ manga }: CardProps) {
  return (
    <div className="card">
      <li className="card-li">
        <Link to={`/detail/${manga.id}`}>
          <div className="Image container">
            <img src={manga.image} alt="Manga's cover" className="card-image" />
          </div>
        </Link>

        <p>{manga.name}</p>
      </li>
    </div>
  );
}
