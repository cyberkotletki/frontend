import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface User {
  name: string;
  topics: string[];
}

export interface UserState {
  user: User;
}

const initialState: UserState = {
  user: {
    name: "Anonymous",
    topics: ["Gaming", "Streaming", "Technology", "Music"],
  },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserName: (state, action: PayloadAction<string>) => {
      state.user.name = action.payload;
    },
    addTopic: (state, action: PayloadAction<string>) => {
      if (!state.user.topics.includes(action.payload)) {
        state.user.topics.push(action.payload);
      }
    },
    removeTopic: (state, action: PayloadAction<string>) => {
      state.user.topics = state.user.topics.filter(
        (topic) => topic !== action.payload,
      );
    },
  },
});

export const { setUserName, addTopic, removeTopic } = userSlice.actions;

export default userSlice.reducer;
