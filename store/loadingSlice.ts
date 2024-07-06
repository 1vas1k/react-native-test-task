import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface ILoading {
  isLoading: boolean;
}

const initialState: ILoading = {
  isLoading: false,
};

export const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<Partial<ILoading>>) => {
      const { isLoading } = action.payload;
      if (isLoading !== undefined) state.isLoading = isLoading;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export default loadingSlice.reducer;
