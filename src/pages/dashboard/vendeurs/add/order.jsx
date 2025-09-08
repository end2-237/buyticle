import React, { useState, useEffect } from "react";
import {
  FaInbox,
  FaRecycle,
  FaShippingFast,
  FaCheckCircle,
} from "react-icons/fa";
import {
  FiBell,
  FiHelpCircle,
  FiSearch,
  FiMoreVertical,
  FiCreditCard,
  FiAlertTriangle,
} from "react-icons/fi";
import { useShop } from "../../../../contexts/shopContext";

const STATUTS = [
  { label: "Toutes", value: "Toutes" },
  { label: "En traitement", value: "En traitement" },
  { label: "Complétée", value: "Complétée" },
  { label: "Annulée", value: "Annulée" },
];

const TableauClient = () => {
  const { orders } = useShop();

  const [ongletActif, setOngletActif] = useState("Toutes");
  const [commandes, setCommandes] = useState([]);
  const [total, setTotal] = useState(0);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(null);
  const [recherche, setRecherche] = useState("");
  const [triAsc, setTriAsc] = useState(false);

  useEffect(() => {
    setCommandes(orders || []);
  }, [orders]);

  const commandesFiltrees = commandes
    .filter((cmd) => {
      const statutFiltre =
        ongletActif === "Toutes"
          ? true
          : ongletActif === "En traitement"
          ? ["OrderStatus.pending", "OrderStatus.processing"].includes(cmd.status)
          : ongletActif === "Complétée"
          ? cmd.status === "OrderStatus.delivered"
          : ongletActif === "Annulée"
          ? cmd.status === "OrderStatus.cancelled"
          : true;

      const rechercheFiltre =
        cmd.id.toLowerCase().includes(recherche.toLowerCase()) ||
        cmd.items.some((item) =>
          item.title.toLowerCase().includes(recherche.toLowerCase())
        );

      return statutFiltre && rechercheFiltre;
    })
    .sort((a, b) => {
      const dateA = new Date(a.orderDate);
      const dateB = new Date(b.orderDate);
      return triAsc ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    const totalAmount = commandesFiltrees.reduce(
      (acc, cmd) => acc + Number(cmd.totalAmount || 0),
      0
    );
    setTotal(totalAmount);
  }, [commandesFiltrees]);

  useEffect(() => {
    if (
      commandesFiltrees.length > 0 &&
      (!commandeSelectionnee ||
        !commandesFiltrees.find((cmd) => cmd.id === commandeSelectionnee.id))
    ) {
      setCommandeSelectionnee(commandesFiltrees[0]);
    }
  }, [commandesFiltrees]);

  const prendreEnCharge = (id) => {
    const nouvellesCommandes = commandes.map((cmd) =>
      cmd.id === id
        ? { ...cmd, priseEnCharge: true, status: "OrderStatus.processing" }
        : cmd
    );
    setCommandes(nouvellesCommandes);
    setCommandeSelectionnee(nouvellesCommandes.find((cmd) => cmd.id === id));
  };

  const getStatutLabel = (status) => {
    switch (status) {
      case "OrderStatus.pending":
      case "OrderStatus.processing":
        return "En traitement";
      case "OrderStatus.completed":
        return "Complétée";
      case "OrderStatus.cancelled":
        return "Annulée";
      default:
        return status;
    }
  };

  const statutColor = (status) => {
    switch (status) {
      case "OrderStatus.completed":
        return "text-green-600";
      case "OrderStatus.cancelled":
        return "text-red-600";
      case "OrderStatus.pending":
      case "OrderStatus.processing":
        return "text-yellow-600";
      default:
        return "text-gray-600";
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen flex flex-col gap-6 font-sans text-gray-800">
      {/* En-tête & Recherche */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex flex-col">
          <button
            className="text-indigo-600 hover:text-indigo-800 font-medium transition"
            aria-label="Retour aux clients"
          >
            &larr; Retour aux clients
          </button>
          {commandeSelectionnee && (
            <h1 className="text-3xl font-bold truncate max-w-xs mt-1">
              {commandeSelectionnee.Name}
            </h1>
          )}
        </div>
        <div className="flex flex-wrap items-center gap-3 md:gap-6 w-full md:w-auto">
          <div className="relative w-full md:w-72">
            <input
              type="search"
              placeholder="Rechercher commande, produit..."
              className="w-full rounded-lg border border-gray-300 bg-white py-2 pl-11 pr-4 shadow-sm text-gray-700 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
              aria-label="Recherche commandes"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <input
            type="month"
            className="w-40 rounded-lg border border-gray-300 py-2 px-3 shadow-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            defaultValue="2025-01"
            aria-label="Filtrer par mois"
          />
          <button
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Notifications"
          >
            <FiBell className="w-6 h-6" />
          </button>
          <button
            className="text-gray-600 hover:text-gray-900 transition"
            aria-label="Aide"
          >
            <FiHelpCircle className="w-6 h-6" />
          </button>
          <button className="btn btn-outline btn-sm whitespace-nowrap">
            Voir la boutique
          </button>
        </div>
      </header>

      {/* Statistiques */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
        {[
          {
            titre: "Coût total",
            valeur: total.toLocaleString("fr-FR", {
              style: "currency",
              currency: "XAF",
              minimumFractionDigits: 0,
            }),
            note: "Coût total des commandes affichées",
            icon: <FiCreditCard className="w-6 h-6 text-indigo-600" />,
          },
          {
            titre: "Total des commandes",
            valeur: commandes.length,
            note: "Toutes les commandes",
            icon: <FiAlertTriangle className="w-6 h-6 text-yellow-500" />,
          },
          {
            titre: "Complétées",
            valeur: commandes.filter(
              (c) => c.status === "OrderStatus.completed"
            ).length,
            note: "Commandes terminées",
            icon: <FaCheckCircle className="w-6 h-6 text-green-600" />,
          },
          {
            titre: "Annulées",
            valeur: commandes.filter(
              (c) => c.status === "OrderStatus.cancelled"
            ).length,
            note: "Commandes annulées",
            icon: <FaRecycle className="w-6 h-6 text-red-500" />,
          },
        ].map((stat, idx) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-md p-5 flex items-center gap-4 hover:shadow-lg transition-shadow cursor-default"
            role="region"
            aria-label={stat.titre}
          >
            <div className="p-3 bg-indigo-100 rounded-full flex items-center justify-center">
              {stat.icon}
            </div>
            <div>
              <p className="text-sm text-gray-500">{stat.titre}</p>
              <p className="text-2xl font-semibold">{stat.valeur}</p>
              <p className="text-xs text-gray-400 mt-1">{stat.note}</p>
            </div>
          </div>
        ))}
      </section>

      {/* Onglets filtrage */}
      <nav
        className="flex gap-4 border-b border-gray-200 mb-4 overflow-x-auto scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100"
        aria-label="Filtrer les commandes par statut"
      >
        {STATUTS.map(({ label, value }) => (
          <button
            key={value}
            onClick={() => setOngletActif(value)}
            className={`py-2 px-4 rounded-t-lg font-semibold transition ${
              ongletActif === value
                ? "bg-indigo-600 text-white shadow-md"
                : "text-gray-600 hover:text-indigo-600 hover:border-b-2 hover:border-indigo-600"
            }`}
            aria-current={ongletActif === value ? "page" : undefined}
          >
            {label}
          </button>
        ))}
      </nav>

      {/* Contenu principal */}
      <main className="flex flex-col lg:flex-row gap-6">
        {/* Colonne gauche - Liste commandes + info client */}
        <section
          className="flex-shrink-0 w-full lg:w-96 bg-white rounded-xl shadow-md p-5 flex flex-col max-h-[700px]"
          aria-label="Liste des commandes"
        >
          {/* Info client */}
          {commandeSelectionnee ? (
            <div className="mb-6">
              <div className="flex justify-between items-center border-b border-gray-200 pb-2 mb-3">
                <p className="text-sm font-semibold text-gray-700">
                  Dernière commande &gt; 10000 FCFA
                </p>
                <div className="flex gap-2">
                  <button
                    className="p-2 bg-indigo-50 rounded-md hover:bg-indigo-100 transition"
                    aria-label={
                      commandeSelectionnee.priseEnCharge
                        ? "Commande prise en charge"
                        : "Commande non prise en charge"
                    }
                  >
                    {commandeSelectionnee.priseEnCharge ? (
                      <FaInbox className="text-indigo-600 w-5 h-5" />
                    ) : (
                      <FaShippingFast className="text-indigo-600 w-5 h-5" />
                    )}
                  </button>
                  <button className="p-2 bg-indigo-50 rounded-md hover:bg-indigo-100 transition">
                    <FiMoreVertical className="text-indigo-600 w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="text-gray-700 space-y-2 text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">Nom :</span>{" "}
                  {commandeSelectionnee.Name}
                </p>
                <p>
                  <span className="font-semibold">Email :</span>{" "}
                  {commandeSelectionnee.email || "Non renseigné"}
                </p>
                <p>
                  <span className="font-semibold">Téléphone :</span>{" "}
                  {commandeSelectionnee.PhoneNumber
                    ? `+237 ${commandeSelectionnee.PhoneNumber}`
                    : "Non renseigné"}
                </p>
                <p>
                  <span className="font-semibold">Adresse :</span>
                  <br />
                  {commandeSelectionnee.Street}, {commandeSelectionnee.City},{" "}
                  <br />
                  {commandeSelectionnee.State}, {commandeSelectionnee.PostalCode}
                  , <br />
                  {commandeSelectionnee.Country}
                </p>
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-400">Aucune commande sélectionnée</p>
          )}

          {/* Table liste commandes */}
          <div className="overflow-y-auto flex-1 scrollbar-thin scrollbar-thumb-indigo-300 scrollbar-track-indigo-100 rounded-md border border-gray-200">
            <table className="w-full border-collapse text-sm">
              <thead className="bg-indigo-50 sticky top-0 z-10">
                <tr>
                  <th className="text-left p-3 font-medium text-indigo-700">ID</th>
                  <th className="text-left p-3 font-medium text-indigo-700 cursor-pointer" onClick={() => setTriAsc(!triAsc)}>
                    Date{" "}
                    <span className="inline-block text-xs text-indigo-500">
                      {triAsc ? "▲" : "▼"}
                    </span>
                  </th>
                  <th className="text-left p-3 font-medium text-indigo-700">Statut</th>
                  <th className="text-right p-3 font-medium text-indigo-700">Total</th>
                  <th className="text-center p-3 font-medium text-indigo-700">Action</th>
                </tr>
              </thead>
              <tbody>
                {commandesFiltrees.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-400 italic">
                      Aucune commande trouvée.
                    </td>
                  </tr>
                ) : (
                  commandesFiltrees.map((cmd) => (
                    <tr
                      key={cmd.id}
                      onClick={() => setCommandeSelectionnee(cmd)}
                      className={`cursor-pointer transition hover:bg-indigo-100 ${
                        commandeSelectionnee?.id === cmd.id ? "bg-indigo-200" : ""
                      }`}
                      tabIndex={0}
                      aria-selected={commandeSelectionnee?.id === cmd.id}
                    >
                      <td className="p-3 font-mono text-xs">{cmd.id}</td>
                      <td className="p-3">
                        {new Date(cmd.orderDate).toLocaleDateString("fr-FR")}
                      </td>
                      <td className={`p-3 font-semibold ${statutColor(cmd.status)}`}>
                        {getStatutLabel(cmd.status)}
                      </td>
                      <td className="p-3 text-right font-semibold text-indigo-700">
                        {Number(cmd.totalAmount).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "XAF",
                          minimumFractionDigits: 0,
                        })}
                      </td>
                      <td className="p-3 text-center">
                        {!cmd.priseEnCharge && cmd.status === "OrderStatus.pending" ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              prendreEnCharge(cmd.id);
                            }}
                            className="px-3 py-1 bg-indigo-600 text-white rounded-md text-sm hover:bg-indigo-700 transition"
                            aria-label="Prendre en charge la commande"
                          >
                            Prendre en charge
                          </button>
                        ) : (
                          <span className="text-green-600 font-semibold">Pris en charge</span>
                        )}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Colonne droite - Détail commande */}
        <section
          className="flex-1 bg-white rounded-xl shadow-md p-6 overflow-y-auto max-h-[700px]"
          aria-label="Détails de la commande sélectionnée"
        >
          {commandeSelectionnee ? (
            <>
              <h2 className="text-2xl font-semibold mb-4">Détails de la commande</h2>

              <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                {commandeSelectionnee.items.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-4 border rounded-lg p-4 hover:shadow-lg transition cursor-default"
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
                    />
                    <div className="flex flex-col flex-1">
                      <h3 className="font-semibold">{item.title}</h3>
                      {item.attributes && (
                        <p className="text-xs text-gray-500 truncate">
                          {Object.entries(item.attributes)
                            .map(([key, val]) => `${key}: ${val}`)
                            .join(", ")}
                        </p>
                      )}
                      <p className="text-sm font-semibold mt-1 text-indigo-700">
                        {Number(item.price).toLocaleString("fr-FR", {
                          style: "currency",
                          currency: "XAF",
                          minimumFractionDigits: 0,
                        })}
                      </p>
                      <p className="text-xs text-gray-400">
                        Qté : {item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 flex justify-between text-lg font-semibold text-indigo-900">
                <span>Total commande :</span>
                <span>
                  {Number(commandeSelectionnee.totalAmount).toLocaleString("fr-FR", {
                    style: "currency",
                    currency: "XAF",
                    minimumFractionDigits: 0,
                  })}
                </span>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-400 italic">
              Sélectionnez une commande pour voir les détails.
            </p>
          )}
        </section>
      </main>
    </div>
  );
};

export default TableauClient;
