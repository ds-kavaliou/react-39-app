import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'history',
    initialState: [],
    reducers: {
        addHistoryElement: (state, action) => {
            state.push(action.payload);
        },
        initHistoryElement: (state, action) => {
            return action.payload ?? state;
        }, 
    }
})

export default slice;

export const { addHistoryElement, initHistoryElement } = slice.actions;

export const selectHistoryIds = (state) => state.history;
export const selectIsInHistory = (id) => (state) =>
  state.history.includes(id);