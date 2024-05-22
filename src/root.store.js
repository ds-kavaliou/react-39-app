import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import { storage } from "src/lib";

import charactersApi from "src/features/characters/api";

import favSlice, {
  listener as favListener,
} from "src/features/favorites/slice";
import { repository as favRepository } from "src/features/favorites/repository";

import authSlice, { listener as authListener } from "src/features/auth/slice";
import { repository as authRepository } from "src/features/auth/repository";
import { STORAGE_AUTH_USER_KEY } from "./features/auth/consts";

const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    [favSlice.reducerPath]: favSlice.reducer,
    [authSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .prepend(authListener.middleware)
      .prepend(favListener.middleware);
  },
});

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

authListener.startListening({
  matcher: isAnyOf(
    authSlice.actions.setCurrentUser,
    authSlice.actions.clearCurrentUser
  ),
  effect: (_, { getState }) => {
    const user = getState().auth.user;

    if (user) {
      const favorites = favRepository.getFavoritesByUserId(user.id);
      store.dispatch(favSlice.actions.init(favorites));
    } else {
      store.dispatch(favSlice.actions.init([]));
    }

    storage.set(STORAGE_AUTH_USER_KEY, user);
  },
});

/**
 * Listen favorite actions and
 * save current state in localStorrage
 */

favListener.startListening({
  matcher: isAnyOf(favSlice.actions.add, favSlice.actions.remove),
  effect: (_, { getState }) => {
    const user = getState().auth.user;
    if (user) {
      favRepository.saveFavoritesByUserId(user.id, getState().favorites);
    }
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
