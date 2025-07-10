import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DEFAULT_USER_STATE, UserProfileResponse } from "@/types/user";
import { RootState } from "@/stores/store";

export const userSlice = createSlice({
  name: "user",
  initialState: DEFAULT_USER_STATE,
  reducers: {
    setIsAuthenticated: (state, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },
    setUserProfile: (state, action: PayloadAction<UserProfileResponse>) => {
      state.profile = action.payload;
    },
    setUserName: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.name = action.payload;
      } else {
        state.profile = {
          uuid: "",
          name: action.payload,
          banner: "",
          avatar: "",
          background_color: null,
          background_image: null,
          button_background_color: "#FFFFFF",
          button_text_color: "#0F0F0F",
          balance: 0,
          topics: [],
        };
      }
    },
    addTopic: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        // Проверяем, что топик еще не добавлен
        if (!state.profile.topics.includes(action.payload)) {
          state.profile.topics.push(action.payload);
        }
      }
    },
    removeTopic: (state, action: PayloadAction<string>) => {
      if (state.profile && state.profile.topics) {
        state.profile.topics = state.profile.topics.filter(
          (topic) => topic !== action.payload,
        );
      }
    },
    clearUserProfile: (state) => {
      state.profile = null;
    },
    logout: () => DEFAULT_USER_STATE,
  },
});

export const {
  setIsAuthenticated,
  setUserProfile,
  setUserName,
  addTopic,
  removeTopic,
  clearUserProfile,
  logout,
} = userSlice.actions;

export const getIsAuthenticated = (state: RootState) =>
  state.user.isAuthenticated;
export const getUserProfile = (state: RootState) => state.user.profile;

export default userSlice.reducer;
