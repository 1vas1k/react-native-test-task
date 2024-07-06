import { configureStore } from "@reduxjs/toolkit";
import pokemonReducer from "./pokemonSlice";
import loadingReducer from "./loadingSlice";
import errorReducer from "./errorSlice";

export const store = configureStore({
  reducer: {
    poke: pokemonReducer,
    loading: loadingReducer,
    error: errorReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
