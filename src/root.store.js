import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

// import featureApi from "feature/feature-2/api";
// import featureSlice from "feature/feature-1/slice.js";

const store = configureStore({
  reducer: {
    // [featureApi.reducerPath]: featureApi.reducer,
    // [featureSlice.reducerPath]: authSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      [] // featureApi.middleware
    );
  },
});

export function StoreProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
