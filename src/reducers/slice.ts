import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user.js";

export type State = {
  userLogged: any;
  loggedUser: UserStructure;
  token: string;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {} as UserStructure,
  loggedUser: {} as UserStructure,
  token: "",
  users: [],
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.userLogged = null;
      state.users = [];
    },
    login(state, action: PayloadAction<UserStructure>) {
      console.log("ACTION", action);
      (state.userLogged.token as UserStructure) = action.payload;
    },
    register(state, action: PayloadAction<UserStructure>) {
      state.users = [...state.users, action.payload];
    },
    addKart(state, action: PayloadAction<UserStructure>) {
      state.userLogged = action.payload;
    },
    deleteKart(state, action: PayloadAction<UserStructure>) {
      state.userLogged = action.payload;
    },
    saveUser(state, action: PayloadAction<UserStructure>) {
      state.loggedUser = action.payload;
    },
  },
});

export const { login, logout, register, addKart, deleteKart, saveUser } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
