import { Provider } from "react-redux";
import {
  configureStore,
  createListenerMiddleware,
  isAnyOf,
} from "@reduxjs/toolkit";

import { storage } from "src/lib";

import { crypto } from "src/lib";

import charactersApi from "src/features/characters/api";

import favSlice, { add, init, remove } from "src/features/favorites/slice";
import { repository as favRepository } from "src/features/favorites/repository";

import historySlice, { initHistoryElement } from "src/features/history/slice";
import {repository as historyRepository} from "src/features/history/repository";

import authSlice, {
  clearCurrentUser,
  setCurrentUser,
} from "src/features/auth/slice";
import { repository as authRepository } from "src/features/auth/repository";
import { STORAGE_AUTH_USER_KEY } from "./features/auth/consts";

const appListener = createListenerMiddleware();

const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    [favSlice.reducerPath]: favSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
    [historySlice.reducerPath]: historySlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .prepend(appListener.middleware);
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

/**
 * Read cached user and set it as current
 **/

authRepository.me().then((user) => {
  if (user) {
    store.dispatch(authSlice.actions.setCurrentUser(user));
  }
});

/**
 * Listen authentication change
 */

setupAuthenticationListener(appListener.startListening);

/**
 * Listen favorite changes and save localStorrage
 */
setupChangeFavoritesListener(appListener.startListening);

/**
 * Listen history changes and save localStorrage
 */
setupHistoryListener(appListener.startListening);

function setupAuthenticationListener(start) {
  start({
    matcher: isAnyOf(setCurrentUser, clearCurrentUser),
    effect: (_, { getState, dispatch }) => {
      const user = getState().auth.user;
      if (user) {
        const favorites = favRepository.getFavoritesByUserId(user.id);
        const history = historyRepository.getHistoryByUserId(user.id);
        dispatch(init(favorites));
        dispatch(initHistoryElement(history));
      } else {
        dispatch(init([]));
        dispatch(initHistoryElement([]));
      }

      storage.set(STORAGE_AUTH_USER_KEY, user);
    },
  });
}

function setupChangeFavoritesListener(start) {
  start({
    matcher: isAnyOf(add, remove),
    effect: (_, { getState }) => {
      const user = getState().auth.user;
      if (user) {
        favRepository.saveFavoritesByUserId(user.id, getState().favorites);
      }
    },
  });
}

function setupHistoryListener(start) {
  const { addHistoryElement, removeHistoryElement, clearHistory } = historySlice.actions;
  start({
    matcher: charactersApi.endpoints.getById.matchFulfilled,
    effect: ({ payload }, { dispatch }) => {
      const timestamp = new Date().toISOString();
      const entry = { id: crypto.uuid(), timestamp, payload };

      dispatch(addHistoryElement(entry));
    },
  });

  start({
    matcher: isAnyOf(addHistoryElement, removeHistoryElement, clearHistory),
    effect: (_, { getState }) => {
      const user = getState().auth.user;
      if (user) {
        historyRepository.saveHistoryByUserId(
        user.id,
        getState().history
      );}
    },
  });
}
  