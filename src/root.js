import { AppRouter } from "./root.router";
import { StoreProvider } from "./root.store";

export function Root() {
  return (
    <StoreProvider>
      <AppRouter />
    </StoreProvider>
  );
}
