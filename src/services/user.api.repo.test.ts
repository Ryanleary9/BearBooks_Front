import { error } from "console";
import { UserRepo } from "./users.api.repo";

describe("Given the login method is used ", () => {
  let repo = new UserRepo();

  describe("When ", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const results = await repo.loginUser({});
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      global.fetch = jest.fn().mockResolvedValue("Error");
      const results = repo.loginUser({
        email: "asda@es.es",
      });
      expect(results).rejects.toThrow();
    });
  });
  describe("When the register method is used", () => {
    test("Then it should ", async () => {
      const mockValue = {};

      global.fetch = jest.fn().mockResolvedValue({
        ok: true,
        json: jest.fn().mockResolvedValue(mockValue),
      });

      const results = await repo.registerUser({
        id: "1",
        email: "asdasd@es.es",
        passwd: "asda",
      });
      expect(results).toEqual(mockValue);
    });
    test("Then it should ", () => {
      global.fetch = jest.fn().mockResolvedValue({ ok: false });
      const results = repo.registerUser({
        id: "2",
        email: "asdasd@es.es",
        passwd: "asda",
      });
      expect(results).rejects.toThrowError();
    });
  });
});
