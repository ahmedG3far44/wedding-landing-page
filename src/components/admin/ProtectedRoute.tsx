import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
export function ProtectedRoute() {
  return useAuth().isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/admin/login" replace />
  );
}
