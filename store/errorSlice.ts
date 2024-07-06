import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface IError {
  error: string | null;
}

const initialState: IError = {
  error: null,
};

export const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<Partial<IError>>) => {
      const { error } = action.payload;
      if (error !== undefined) state.error = error;
    },
  },
});

export const { setError } = errorSlice.actions;
export default errorSlice.reducer;
