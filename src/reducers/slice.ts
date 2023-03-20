import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { UserStructure } from "../models/user";

export type State = {
  userLogged: UserStructure | null;
  users: UserStructure[];
};

const initialState: State = {
  userLogged: {} as UserStructure,
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
      state.userLogged = action.payload;
    },
    register(state, action: PayloadAction<UserStructure>) {
      state.users = [...state.users, action.payload];
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const userReducer = userSlice.reducer;
