import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Wish } from "@/types/wishlist.ts";
import { RootState } from "@/stores/store.tsx";

export interface wishSliceState {
  wish: Wish | null;
}

const initialState: wishSliceState = {
  wish: null,
};

export const wishSlice = createSlice({
  name: "wish",
  initialState,
  reducers: {
    setWish: (state, action: PayloadAction<Wish>) => {
      state.wish = action.payload;
    },
  },
});

export const { setWish } = wishSlice.actions;

export const getWish = (state: RootState) => state.wish.wish;

export default wishSlice.reducer;
