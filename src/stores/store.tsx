import { configureStore } from "@reduxjs/toolkit";

import wishReducer from "@/stores/wishSlice.tsx";

export const store = configureStore({
  reducer: {
    wish: wishReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
