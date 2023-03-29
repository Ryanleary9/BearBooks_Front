import { Manga } from "../../models/manga";
import { MangaRepo } from "./manga.api.repo";

global.fetch = jest.fn().mockRejectedValue({});

const mockChar: Manga = {
  author: "kentaro",
  category: "seinen",
  description: "berserk desc",
  firstChap: ["first chap"],
  id: "1",
  image: "image",
  name: "Berserk",
  price: 14,
};

const mockChar2: Manga = {
  author: "kentaro miura",
  category: "seinen",
  description: "berserk desc",
  firstChap: ["first chap2"],
  id: "2",
  image: "image2",
  name: "Berserk 2",
  price: 14,
};

describe("Given the MangaRepo", () => {
  let repo: MangaRepo;
  beforeEach(() => {
    repo = new MangaRepo();
  });
  describe("When getMangas is called ", () => {
    test("Then it should load all the mangas from the backend", async () => {
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue([]),
      });
      const resp = await repo.getAllMangas();
      expect(fetch).toHaveBeenCalled();
      expect(resp).toEqual([]);
    });
    test("Then it should thow an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const resp = repo.getAllMangas();
      expect(fetch).toHaveBeenCalled();
      await expect(resp).rejects.toThrowError();
    });
  });

  describe("When getOneMangas is called ", () => {
    test("Then it should it should return the data", async () => {
      const mockValue = {} as unknown as Manga;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        id: "1",
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const result = await repo.getOneManga("1");
      expect(result).toEqual(mockValue);
    });
    test("should first", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.getOneManga("1");
      await expect(result).rejects.toThrow();
    });
  });

  describe("When createManga is called ", () => {
    test("Then it should it should return the new manga data", async () => {
      const mockValue = {} as unknown as Manga;
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        body: "test",
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const result = await repo.createManga("token", mockValue);
      expect(result).toEqual(mockValue);
    });
    test("It should throw an error", async () => {
      const mockValue = {} as unknown as Manga;

      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.createManga("token", mockValue);
      await expect(result).rejects.toThrow();
    });
  });

  describe("When createManga is called ", () => {
    test("Then it should it should return the new manga data", async () => {
      const mockValue = [] as unknown as Manga[];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const result = await repo.updateManga("token", "id", {});
      expect(result).toEqual(mockValue);
    });
    test("It should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.updateManga("token", "id", {});
      await expect(result).rejects.toThrow();
    });
  });

  describe("When delete is called ", () => {
    test("Then it should it should delete de manga", async () => {
      const mockValue = [{ id: "1" }, { id: "2" }];
      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const result = await repo.deleteManga("token", "2");
      expect(result).toEqual(undefined);
    });
    test("It should throw an error", async () => {
      global.fetch = jest.fn().mockResolvedValue("error");
      const result = repo.deleteManga("token", "id");
      await expect(result).rejects.toThrow();
    });
  });
});
