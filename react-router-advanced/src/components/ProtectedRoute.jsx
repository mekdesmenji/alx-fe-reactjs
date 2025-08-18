import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function ProtectedRoute({ element }) {
  const { user } = useAuth();

  return user ? element : <Navigate to="/login" replace />;
}
