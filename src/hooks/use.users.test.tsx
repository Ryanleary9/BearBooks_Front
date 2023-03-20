import { act, render, screen } from "@testing-library/react";
import { UserStructure } from "../models/user";
import { UserRepo } from "../services/users.api.repo";
import { Provider } from "react-redux";
import { store } from "../store/store";
import userEvent from "@testing-library/user-event";
import { useUser } from "./use.users";

describe("Given the useUser hook ", () => {
  let payloadMock: UserStructure;
  let repoMock: UserRepo;

  beforeEach(async () => {
    payloadMock = {
      id: "asda",
      email: "adsda@asda.es",
      passwd: "asda",
    } as unknown as UserStructure;

    repoMock = {
      loginUser: jest.fn(),
      registerUser: jest.fn(),
    } as unknown as UserRepo;

    const TestComponent = function () {
      const { userLogin, userRegister } = useUser(repoMock);
      return (
        <>
          <button onClick={() => userLogin(payloadMock)}>login</button>
          <button onClick={() => userRegister(payloadMock)}>register</button>
        </>
      );
    };
    await act(async () => {
      render(
        <Provider store={store}>
          <TestComponent />
        </Provider>
      );
    });
  });
  describe("When test is loaded ", () => {
    test("Then it should render test component", async () => {
      const component = await screen.findAllByRole("button");
      expect(component[0]).toBeInTheDocument();
      expect(component[1]).toBeInTheDocument();
    });
  });
  describe("When the login method called", () => {
    test("Then it should use login method", async () => {
      const component = await screen.findAllByRole("button");
      await act(async () => userEvent.click(component[0]));
      expect(repoMock.loginUser).toHaveBeenCalled();
    });
  });
  describe("When the register mehtod is called", () => {
    test("Then it should use register method", async () => {
      const component = await screen.findAllByRole("button");
      await act(async () => userEvent.click(component[1]));
      expect(repoMock.registerUser).toHaveBeenCalled();
    });
  });
});
