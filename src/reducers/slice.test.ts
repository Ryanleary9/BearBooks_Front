import { PayloadAction } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user.js";
import { State, userReducer } from "./slice.js";

const passwdMock = "dsad";

const userMock = {
  id: "1",
  email: "asda@es.es",
  passwd: passwdMock,
  kart: [],
};

const mockInitialState: State = {
  userLogged: {} as UserStructure,
  loggedUser: {} as UserStructure,
  token: "",
  users: [],
};

describe("Given the userSlice", () => {
  describe("When the Login method is called ", () => {
    test("Then at should use the login method in the slice ", () => {
      const mockLoginAction: PayloadAction<UserStructure> = {
        type: "user/login",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockLoginAction);
      expect(element.loggedUser).toEqual({});
      expect(element.userLogged).toEqual({ token: userMock });
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
  describe("When the addKart method is called ", () => {
    test("Then it should use the addKart method in the slice ", () => {
      const mockAddKartAction: PayloadAction<UserStructure> = {
        type: "user/addKart",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockAddKartAction);
      expect(element.userLogged).toEqual(userMock);
    });
  });
  describe("When the deleteKart method is called ", () => {
    test("Then it should use the deleteKart method in the slice ", () => {
      const mockDeleteKartAction: PayloadAction<UserStructure> = {
        type: "user/deleteKart",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockDeleteKartAction);
      expect(element.userLogged).toEqual(userMock);
    });
  });

  describe("When the saveUser method is called ", () => {
    test("Then it should use the addKart method in the slice ", () => {
      const mockSaveUSerAction: PayloadAction<UserStructure> = {
        type: "user/saveUser",
        payload: userMock,
      };
      const element = userReducer(mockInitialState, mockSaveUSerAction);
      expect(element.loggedUser).toEqual(userMock);
    });
  });
});
