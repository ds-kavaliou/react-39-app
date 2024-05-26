import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
  name: "history",
  initialState: [],
  reducers: {
    addHistoryElement: (state, action) => {
      state.unshift(action.payload);
    },
    removeHistoryElement: (state, action) => {
      return state.filter(({ id }) => id !== action.payload);
    },
    clearHistory: (state) => {
      state.entries = [];
    },
    initHistoryElement: (state, action) => {
      return action.payload ?? state;
    },
  },
});

export default slice;

export const {
  addHistoryElement,
  removeHistoryElement,
  clearHistory,
  initHistoryElement,
} = slice.actions;

export const selectUserHistory = (state) => state.history;
