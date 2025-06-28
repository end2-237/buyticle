// src/routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useShop } from "../contexts/shopContext";
import Loader from "../pages/othersPages/loader";

export default function PrivateRoute({ children }) {
  const { user, loading } = useShop();

  if (loading) return <Loader/>;

  return user ? children : <Navigate to="/signin" replace />;
}
