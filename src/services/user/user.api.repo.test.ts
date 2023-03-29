import { UserRepo } from "./users.api.repo";

describe("Given the login method is used ", () => {
  let repo = new UserRepo();

  const FetchOK = async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue({}),
    });
  };
  const FetchNoOK = async () => {
    global.fetch = jest.fn().mockResolvedValue("error");
  };

  const mockUserOK = {
    id: "1",
    email: "asdasd@es.es",
    passwd: "asda",
  };
  const mockUserKartOK = {
    id: "1",
    email: "asdasd@es.es",
    passwd: "asda",
    kart: [],
  };

  const id = "123";

  describe("When ", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.create(mockUserOK, "login");
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      FetchNoOK();
      const results = repo.create(mockUserOK, "login");
      expect(results).rejects.toThrow();
    });
  });
  describe("When the register method is used", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.create(mockUserOK, "register");
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      FetchNoOK();
      const results = repo.create(mockUserOK, "register");
      expect(results).rejects.toThrowError();
    });
  });

  describe("When add to kart method is used", () => {
    test("Then it should add a manga to the kart", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.kartActions(mockUserKartOK, "add", id);
      expect(results).toEqual(mockValue);
    });
    test("Then if it cant fetch the backend it should throw an error ", () => {
      FetchNoOK();
      const results = repo.kartActions(mockUserKartOK, "add", id);
      expect(results).rejects.toThrow();
    });
  });

  describe("When remove from kart method is used", () => {
    test("Then it should add a manga to the kart", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.kartActions(mockUserKartOK, "delete", id);
      expect(results).toEqual(mockValue);
    });
    test("Then if it cant fetch the backend of the delete method it should throw an error ", () => {
      FetchNoOK();
      const results = repo.kartActions(mockUserKartOK, "delete", id);
      expect(results).rejects.toThrow();
    });
  });
});
