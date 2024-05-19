import { Outlet, Navigate } from "react-router-dom";

export function ProtectedLayout() {
  const isAuthenticated = true;
  return isAuthenticated ? <Outlet /> : <Navigate to="signin" />;
}
