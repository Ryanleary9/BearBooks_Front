import { useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router";
import { MangaRepo } from "../../services/manga/manga.api.repo";
import { useManga } from "../../hooks/manga/use.manga";
import { getOneManga } from "../../reducers/manga.slice";
import "./details.scss";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";

export default function Details() {
  const { id } = useParams();

  const userState = useSelector((state: RootState) => state.users);

  const mangaRepo = useMemo(() => new MangaRepo(), []);

  const { getMangaOne, mangaDelete, mangaState } = useManga(mangaRepo);

  useEffect(() => {
    getMangaOne(id);
  }, [getOneManga]);
  const navigate = useNavigate();
  const manga = mangaState.mangas[0];
  const deleteSubmit = () => {
    mangaDelete(userState.userLogged.token, manga.id);
    navigate("/home");
  };

  return (
    <>
      <span className="outer-details-2">
        <span className="outer-details">
          <span className="details">
            <img src={manga.image} alt={manga.name} className="detail-image" />
            <span className="details-inner">
              <span>
                <h2>Title: {manga.name}</h2>
                <p>Author: {manga.author}</p>
                <p>Category: {manga.category}</p>
                <p>Description: {manga.description}</p>
                <p>{manga.price} €</p>
              </span>
              <Link to={`/edit/${manga.id}`}>
                <button type="submit" className="edit-button">
                  Edit
                </button>
              </Link>
              <button
                type="submit"
                className="edit-button"
                onClick={deleteSubmit}
              >
                Delete
              </button>
            </span>
          </span>
        </span>
      </span>
    </>
  );
}
