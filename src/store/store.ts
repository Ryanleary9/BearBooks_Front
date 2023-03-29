import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "../reducers/slice";
import { mangaReducer } from "../reducers/manga.slice";

export const store = configureStore({
  reducer: {
    users: userReducer,
    mangas: mangaReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
