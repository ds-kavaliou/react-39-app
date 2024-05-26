import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

import { selectCurrentUser } from "src/features/auth/slice";

export function ProtectedLayout() {
  const user = useSelector(selectCurrentUser);
  return user ? <Outlet /> : <Navigate to="signin" />;
}
