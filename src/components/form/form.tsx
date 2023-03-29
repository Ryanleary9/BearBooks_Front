import { SyntheticEvent, useMemo } from "react";
import { MangaRepo } from "../../services/manga/manga.api.repo.js";
import { useManga } from "../../hooks/manga/use.manga.js";
import { Manga } from "../../models/manga.js";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store.js";
import { useNavigate } from "react-router";
import "./form.scss";

type ConditionalLoading = { prop: boolean };
export default function Form({ prop }: ConditionalLoading) {
  const mangaRepo = useMemo(() => new MangaRepo(), []);
  const navigate = useNavigate();
  const conditional: boolean = prop;
  const userState = useSelector((state: RootState) => state.users);

  const { mangaCreate, mangaUpdate, mangaState } = useManga(mangaRepo);

  if (conditional === true) {
    const handleCreateSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
      ev.preventDefault();

      const formData = ev.currentTarget as HTMLFormElement;
      const inputs = formData.querySelectorAll("input");

      const newManga: Manga = {
        name: inputs[0].value,
        description: inputs[1].value,
        author: inputs[2].value,
        category: inputs[3].value,
        price: parseFloat(inputs[4].value),
      };
      const coverImage = (inputs[5] as unknown as HTMLFormElement).files?.item(
        0
      );
      mangaCreate(newManga, userState.userLogged.token, coverImage);
      formData.reset();
      navigate("/home");
    };

    return (
      <>
        <span>
          <form onSubmit={handleCreateSubmit} className="form">
            <label htmlFor="name">
              <input
                type="text"
                placeholder="Name"
                required
                id="name"
                className="name-input"
              />
            </label>
            <label htmlFor="description">
              <input
                type="text"
                placeholder="Description"
                required
                id="description"
                className="description-input"
              />
            </label>
            <label htmlFor="author">
              <input
                type="text"
                placeholder="Author"
                required
                id="author"
                className="author-input"
              />
            </label>
            <label htmlFor="category">
              <input
                type="text"
                placeholder="Category"
                required
                id="category"
                className="category-input"
              />
            </label>
            <label htmlFor="price">
              <input
                type="number"
                placeholder="Price"
                required
                id="price"
                className="price-input"
              />
            </label>
            <label htmlFor="cover">
              <input type="file" required id="cover" className="file-input" />
            </label>
            <span>
              <button type="submit" className="form-button">
                ADD
              </button>
            </span>
          </form>
        </span>
      </>
    );
  }
  const handleUpdateSubmit = (ev: SyntheticEvent<HTMLFormElement>) => {
    ev.preventDefault();

    const formData = ev.currentTarget as HTMLFormElement;
    const inputs2 = formData.querySelectorAll("input");

    const newManga2: Manga = {
      name: inputs2[0].value,
      description: inputs2[1].value,
      author: inputs2[2].value,
      category: inputs2[3].value,
      price: parseFloat(inputs2[4].value),
    };
    const coverImage = (inputs2[5] as unknown as HTMLFormElement).files?.item(
      0
    );
    mangaUpdate(userState.userLogged, mangaState.mangaId, newManga2);
    formData.reset();

    navigate("/home");
  };

  const manga = mangaState.mangas[0];

  return (
    <>
      <span>
        <form onSubmit={handleUpdateSubmit} className="form">
          <label htmlFor="name">
            <input
              type="text"
              placeholder="Name"
              id="name"
              className="name-input"
              defaultValue={manga.name}
            />
          </label>
          <label htmlFor="description">
            <input
              type="text"
              placeholder="Description"
              id="description"
              className="description-input"
              defaultValue={manga.description}
            />
          </label>
          <label htmlFor="author">
            <input
              type="text"
              placeholder="Author"
              id="author"
              className="author-input"
              defaultValue={manga.author}
            />
          </label>
          <label htmlFor="category">
            <input
              type="text"
              placeholder="Category"
              id="category"
              className="category-input"
              defaultValue={manga.category}
            />
          </label>
          <label htmlFor="price">
            <input
              type="number"
              placeholder="Price"
              id="price"
              className="price-input"
              defaultValue={manga.price}
            />
          </label>
          <label htmlFor="cover">
            <input type="file" id="cover" className="file-input" />
          </label>
          <span>
            <button type="submit" className="form-button">
              EDIT
            </button>
          </span>
        </form>
      </span>
    </>
  );
}
