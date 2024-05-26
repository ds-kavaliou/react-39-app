import { createBrowserRouter, RouterProvider } from "react-router-dom";

import {
  MainLayout,
  SearchableLayout,
  IndexPage,
  SearchPage,
  CharacterPage,
  HistoryPage,
  FavoritesPage,
  ProtectedLayout,
  SignInPage,
  SignUpPage,
  AuthLayout,
  MainErrorPage,
  searchableLayoutLoader,
} from "src/pages";

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <MainErrorPage />,
    children: [
      {
        id: "searchable",
        element: <SearchableLayout />,
        loader: searchableLayoutLoader,
        children: [
          { path: "", element: <IndexPage /> },
          {
            path: "search",
            element: <SearchPage />,
          },
        ],
      },
      {
        element: <AuthLayout />,
        children: [
          { path: "signin", element: <SignInPage /> },
          { path: "signup", element: <SignUpPage /> },
        ],
      },

      {
        element: <ProtectedLayout />,
        children: [
          {
            path: "characters/:id",
            element: <CharacterPage />,
          },
          {
            path: "favorites",
            element: <FavoritesPage />,
          },
          {
            path: "history",
            element: <HistoryPage />,
          },
        ],
      },
    ],
  },
]);

export const AppRouter = () => <RouterProvider router={router} />;
