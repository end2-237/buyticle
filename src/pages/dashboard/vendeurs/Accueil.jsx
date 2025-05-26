import { FaShoppingBag, FaUsers, FaChartLine } from "react-icons/fa";
import { FaLocationCrosshairs, FaWallet } from "react-icons/fa6";
import { FiArrowRight, FiClock } from "react-icons/fi";
import { useShop } from "../../../contexts/shopContext";

export default function Accueil() {
  const { shop, loading, error } = useShop();

  if (loading) return <div className="p-6 text-gray-500">Chargement de vos données...</div>;
  if (error) return <div className="p-6 text-red-500">Erreur : {error.message}</div>;

  const actions = [
    {
      name: "Créer votre premier produit",
      description:
        "Démarrez les ventes en créant vos premiers produits sur la plateforme.",
      action: "Ajouter un produit",
      color: "bg-green-200",
      icon: <FaShoppingBag className="text-green-500 text-xl" />
    },
    {
      name: "Configurer votre adresse",
      description: "Configurez votre adresse pour livrer vos produits.",
      action: "Configurer",
      color: "bg-yellow-200",
      icon: <FaLocationCrosshairs className="text-yellow-500 text-xl" />
    },
    {
      name: "Configurer votre portefeuille",
      description: "Activez votre portefeuille pour recevoir vos paiements.",
      action: "Mon portefeuille",
      color: "bg-blue-200",
      icon: <FaWallet className="text-blue-500 text-xl" />
    },
  ];

  const stats = [
    {
      name: "Produits actifs",
      value: shop?.Products?.length || 0,
      icon: <FaShoppingBag />
    },
    {
      name: "Solde disponible",
      value: `${shop?.MountBalance || 0} FCFA`,
      icon: <FaWallet />
    },
    {
      name: "Bilan annuel",
      value: `${shop?.AnnualBalance || 0} FCFA`,
      icon: <FaChartLine />
    }
  ];

  return (
    <div className="p-6 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">
          Bienvenue, {shop?.Name || "Vendeur"} 👋
        </h2>
        <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-green-50 border border-green-200 text-sm font-medium text-green-700 whitespace-nowrap">
          <FiClock className="animate-spin" />
          <span>Créer votre équipe sur Buyticle</span>
        </div>
      </div>

      {/* Statistiques clés */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border"
          >
            <div className="p-3 bg-gray-100 rounded-full text-xl text-green-600 min-w-[48px] flex justify-center items-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <h4 className="text-xl font-bold text-gray-800">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {actions.map((action, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition p-5 space-y-4 flex flex-col"
          >
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${action.color} min-w-[48px] flex justify-center items-center`}>
                {action.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">{action.name}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-500">{action.description}</p>
            <button className="btn btn-outline btn-sm w-fit flex items-center gap-2 mt-auto">
              {action.action} <FiArrowRight />
            </button>
          </div>
        ))}
      </div>

      {/* Derniers produits */}
      <div className="bg-white p-6 rounded-xl border mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Vos produits</h4>
        {shop?.Products?.length ? (
          <p className="text-gray-600 text-sm">
            {shop.Products.length} produit(s) actuellement listé(s).
          </p>
        ) : (
          <p className="text-gray-500 text-sm">
            Aucun produit trouvé. Ajoutez-en un pour commencer à vendre.
          </p>
        )}
      </div>
    </div>
  );
}
