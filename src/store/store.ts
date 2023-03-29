import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/slice.js";
import { mangaReducer } from "../reducers/manga.slice.js";

export const store = configureStore({
  reducer: {
    users: userReducer,
    mangas: mangaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
