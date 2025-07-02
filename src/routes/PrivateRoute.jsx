import { Navigate } from "react-router-dom";
import { useShop } from "../contexts/shopContext";
import Loader from "../pages/othersPages/loader";

export default function PrivateRoute({ children }) {
  const { user, loading, isActive } = useShop();

  if (loading) return <Loader />;

  if (!user) return <Navigate to="/signin" replace />;

  if (isActive === false) return <Navigate to="/subscription" replace />;

  return children;
}
