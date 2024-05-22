import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCurrentUser(state, action) {
      state.user = action.payload;
    },
    clearCurrentUser(state, action) {
      state.user = null;
    },
  },
});

export default slice;

export const { setCurrentUser, clearCurrentUser } = slice.actions;

export const listener = createListenerMiddleware();

export const selectCurrentUser = (state) => state.auth.user;
