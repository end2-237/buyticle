// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useShop } from "../contexts/shopContext";

export default function PrivateRoute({ children }) {
  const { user, loading } = useShop();

  if (loading) return <div className="p-6 text-center">Chargement...</div>;

  return user ? children : <Navigate to="/signin" replace />;
}
