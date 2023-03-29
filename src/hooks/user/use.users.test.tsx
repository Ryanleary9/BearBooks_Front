import { act, render, screen } from "@testing-library/react";
import { UserStructure } from "../../models/user.js";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { useUser } from "./use.users.js";
import { UserRepo } from "../../services/user/users.api.repo.js";
jest.mock("../../firebase/firebase.user");
jest.mock("../../reducers/slice", () => ({
  saveUser: jest.fn(),
  login: jest.fn(),
}));

jest.mock("react-redux", () => ({
  ...jest.requireActual("react-redux"),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));
describe("Given the useUser hook ", () => {
  let payloadMock: UserStructure;
  let repoMock: UserRepo;
  let createData = { results: [1, 2] };

  beforeEach(async () => {
    payloadMock = {
      id: "asda",
      email: "adsda@asda.es",
      passwd: "asda",
    } as unknown as UserStructure;

    (useSelector as jest.Mock).mockReturnValue({
      loggedUser: {} as UserStructure,
      users: [],
      token: "",
      userLogged: { token: "" } as UserStructure,
    });

    const file = new File([""], "filename.jpg", { type: "image/jpeg" });

    repoMock = {
      create: jest.fn().mockReturnValue(createData),
    } as unknown as UserRepo;

    const TestComponent = function () {
      const { userLogin, userRegister } = useUser(repoMock);
      return (
        <>
          <button onClick={() => userLogin(payloadMock)}>login</button>
          <button onClick={() => userRegister(payloadMock, file)}>
            register
          </button>
        </>
      );
    };
    await act(async () => {
      render(<TestComponent />);
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
      expect(repoMock.create).toHaveBeenCalled();
    });
  });
  describe("When the register mehtod is called from slice", () => {
    test("Then it should use register method from the repo", async () => {
      const component = await screen.findAllByRole("button");
      await act(async () => userEvent.click(component[1]));
      expect(repoMock.create).toHaveBeenCalled();
    });
  });
});
