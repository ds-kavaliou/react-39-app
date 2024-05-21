import { createListenerMiddleware, createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "favorites",
  initialState: [],
  reducers: {
    add: (state, action) => {
      state.push(action.payload);
    },
    remove: (state, action) => {
      const index = state.indexOf(action.payload);
      if (index !== -1) {
        state.splice(index, 1);
      }
    },
    init: (state, action) => {
      return action.payload ?? state;
    },
  },
});

export default slice;

export const { remove, add } = slice.actions;

export const listener = createListenerMiddleware();

export const selectFavoriteIds = (x) => x.favorites;
