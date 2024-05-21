import { configureStore, isAnyOf } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import charactersApi from "src/features/characters/api";

import favSlice, {
  listener as favListener,
} from "src/features/favorites/slice";
import favRepository from "src/features/favorites/repository";

const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
    [favSlice.reducerPath]: favSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(charactersApi.middleware)
      .prepend(favListener.middleware);
  },
});

/**
 * Read favorites stored in localStorage
 * that associated with specific user
 **/
const userId = 1; // fake user id. TODO: Get real userId from auth slice (store.getState().auth)
const favs = favRepository.getFavoritesByUserId(userId);

store.dispatch(favSlice.actions.init(favs));

/**
 * Listen favorite slice actions and
 * save current state in localStorrage
 */
favListener.startListening({
  matcher: isAnyOf(favSlice.actions.add, favSlice.actions.remove),
  effect: (_, { getState }) => {
    favRepository.saveFavoritesByUserId(userId, getState().favorites);
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
