import { Navigate } from "react-router-dom";
import { useAuth } from "../testers/AuthContext";
import EmpDashboard from "./pages/EmpDashboard";

/* /employer : admin → dashboard ; employé → ses tâches */
export default function EmployerHome() {
  const { user } = useAuth();
  if (user?.role !== "admin") return <Navigate to="/employer/my" replace />;
  return <EmpDashboard />;
}
