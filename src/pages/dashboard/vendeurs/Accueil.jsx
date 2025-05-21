import { useState } from "react";
import { FaShoppingBag, FaUsers, FaChartLine } from "react-icons/fa";
import { FaLocationCrosshairs, FaWallet } from "react-icons/fa6";
import { FiArrowRight, FiClock } from "react-icons/fi";

export default function Accuiel() {
  const actions = [
    {
      name: "Créer votre premier produit",
      description:
        "Démarrez les ventes en créant vos premiers produits sur la plateforme. Contactez l'assistance pour des conseils de vente.",
      action: "Ajouter un produit",
      color: "bg-green-200",
      icon: <FaShoppingBag className="text-green-500 text-xl" />
    },
    {
      name: "Configurer votre adresse",
      description:
        "Configurez votre adresse en quelques clics pour pouvoir faire livrer vos produits.",
      action: "Configurer",
      color: "bg-yellow-200",
      icon: <FaLocationCrosshairs className="text-yellow-500 text-xl" />
    },
    {
      name: "Configurer votre portefeuille",
      description:
        "Configurez votre portefeuille de paiement pour effectuer des transactions en toute sécurité.",
      action: "Mon portefeuille",
      color: "bg-blue-200",
      icon: <FaWallet className="text-blue-500 text-xl" />
    },
  ];

  const stats = [
    { name: "Produits actifs", value: 24, icon: <FaShoppingBag /> },
    { name: "Ventes ce mois", value: "1 230 €", icon: <FaChartLine /> },
    { name: "Clients", value: 89, icon: <FaUsers /> }
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-3xl font-bold text-gray-800">Tableau de bord</h2>
        <div className="flex items-center gap-3 px-4 py-2 rounded-md bg-green-50 border border-green-200 text-sm font-medium text-green-700">
          <FiClock className="animate-spin" />
          <span>Créer votre équipe sur Buyticle</span>
        </div>
      </div>

      {/* Phrase d’intro */}
      <h3 className="text-sm text-gray-500">
        Votre marketplace <span className="text-green-700 font-medium">Buyticle</span> vous accompagne partout
      </h3>

      {/* Statistiques clés */}
      <div className="grid grid-cols-3 gap-6">
        {stats.map((stat, idx) => (
          <div key={idx} className="bg-white rounded-xl shadow p-4 flex items-center gap-4 border">
            <div className="p-3 bg-gray-100 rounded-full text-xl text-green-600">{stat.icon}</div>
            <div>
              <p className="text-gray-500 text-sm">{stat.name}</p>
              <h4 className="text-xl font-bold text-gray-800">{stat.value}</h4>
            </div>
          </div>
        ))}
      </div>

      {/* Actions rapides */}
      <div className="grid grid-cols-3 gap-6">
        {actions.map((action, idx) => (
          <div key={idx} className="bg-white rounded-xl border shadow-sm hover:shadow-lg transition p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className={`p-3 rounded-full ${action.color}`}>
                {action.icon}
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-700">{action.name}</h4>
              </div>
            </div>
            <p className="text-sm text-gray-500">{action.description}</p>
            <button className="btn btn-outline btn-sm w-fit flex items-center gap-2">
              {action.action} <FiArrowRight />
            </button>
          </div>
        ))}
      </div>

      {/* Section supplémentaire (à personnaliser plus tard) */}
      <div className="bg-white p-6 rounded-xl border mt-6">
        <h4 className="text-lg font-semibold text-gray-800 mb-2">Vos derniers produits</h4>
        <p className="text-gray-500 text-sm">Aucun produit trouvé. Ajoutez-en un pour commencer à vendre.</p>
      </div>
    </div>
  );
}
