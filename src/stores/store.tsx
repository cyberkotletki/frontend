import { configureStore } from "@reduxjs/toolkit";

import wishReducer from "@/stores/wishSlice.tsx";
import userReducer from "@/stores/userSlice.tsx";

export const store = configureStore({
  reducer: {
    wish: wishReducer,
    user: userReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppStore = typeof store;
