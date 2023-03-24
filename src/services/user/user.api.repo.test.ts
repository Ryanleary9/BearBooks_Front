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

  describe("When ", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.loginUser({});
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      FetchNoOK();
      const results = repo.loginUser({
        id: "1",
        email: "asdasd@es.es",
        passwd: "asda",
      });
      expect(results).rejects.toThrow();
    });
  });
  describe("When the register method is used", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      FetchOK();

      const results = await repo.registerUser(mockUserOK);
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      FetchNoOK();
      const results = repo.registerUser({
        id: "1",
        email: "asdasd@es.es",
        passwd: "asda",
      });
      expect(results).rejects.toThrowError();
    });
  });
});
