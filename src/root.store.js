import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import charactersApi from "src/features/characters/api";

const store = configureStore({
  reducer: {
    [charactersApi.reducerPath]: charactersApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(charactersApi.middleware);
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
