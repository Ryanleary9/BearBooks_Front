import { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user";
import { State, userReducer } from "./slice";

const passwdMock = "dsad";

const userMock = {
  id: "1",
  email: "asda@es.es",
  passwd: passwdMock,
};

const mockInitialState: State = {
  userLogged: {} as UserStructure,
  users: [],
};

describe("Given the userSlice", () => {
  describe("When the Login method is called ", () => {
    test("Then it should use the login method in the slice ", () => {
      const mockLoginAction: PayloadAction<UserStructure> = {
        type: "user/login",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockLoginAction);
      expect(element.userLogged).toEqual(userMock);
    });
  });
  describe("When the register method is called ", () => {
    test("Then it should use the register method in the slice ", () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: "user/register",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockRegisterAction);
      expect(element.users).toEqual([userMock]);
    });
  });
  describe("When the logout method is called ", () => {
    test("Then it should use the logout method in the slice ", () => {
      const mockRegisterAction: PayloadAction<UserStructure> = {
        type: "user/logout",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockRegisterAction);
      expect(element.userLogged).toEqual(null);
    });
  });
});
