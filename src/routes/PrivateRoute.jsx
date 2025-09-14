import { Navigate } from "react-router-dom";
import { useShop } from "../contexts/shopContext";
import Loader from "../pages/othersPages/loader";
import NotFoundPage from "../pages/othersPages/notfound";

export default function PrivateRoute({ children }) {
  const { user, loading, isActive, error } = useShop();

  if (loading) return <Loader />;

  if (error) {
    return (
      // <div className="flex items-center justify-center h-screen bg-gray-50">
      //   <div className="text-center max-w-md mx-auto p-6 bg-white rounded-xl shadow-md">
      //     <h2 className="text-xl font-semibold text-red-600 mb-3">
      //       Oups, problème de connexion
      //     </h2>
      //     <p className="text-gray-600 mb-4">
      //       Impossible de récupérer vos données. Vérifiez votre connexion internet et réessayez.
      //     </p>
      //     <button
      //       onClick={() => window.location.reload()}
      //       className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
      //     >
      //       Réessayer
      //     </button>
      //   </div>
      // </div>

      <NotFoundPage/>
    );
  }

  if (!user) return <Navigate to="/signin" replace />;

  if (isActive === false) return <Navigate to="/subscription" replace />;

  return children;
}
