import React, { useState, useEffect } from "react";
import { FaInbox, FaRecycle, FaShippingFast } from "react-icons/fa";
import { FcPositiveDynamic, FcSafe } from "react-icons/fc";
import {
  FiBell,
  FiHelpCircle,
  FiSearch,
  FiMoreVertical,
  FiCreditCard,
  FiAlertTriangle,
} from "react-icons/fi";

const commandesInitiales = [
  {
    id: "#10001",
    produit: "Huile de Karité Pure",
    date: "2022-01-10T00:00:00",
    statut: "En traitement",
    paiement: "COD",
    prix: 3000,
    priseEnCharge: false,
    client: {
      nom: "Claire Dubois",
      email: "claire@example.com",
      telephone: "+33123456789",
      adresse: "12 rue Lafayette, Paris, France",
      facturation: "Identique à l'adresse de livraison",
    },
  },
  {
    id: "#10002",
    produit: "Savon Naturel Bio",
    date: "2022-02-15T00:00:00",
    statut: "Complétée",
    paiement: "CC",
    prix: 2500,
    priseEnCharge: true,
    client: {
      nom: "Jean Martin",
      email: "jean.martin@example.com",
      telephone: "+33698765432",
      adresse: "45 avenue Victor Hugo, Lyon, France",
      facturation: "Adresse différente : 78 rue de Lille, Lille, France",
    },
  },
  {
    id: "#10003",
    produit: "Ecouteur JBL",
    date: "2023-02-15T00:00:00",
    statut: "En traitement",
    paiement: "OM",
    prix: 7500,
    priseEnCharge: false,
    client: {
      nom: "Nsoga David",
      email: "dan@example.com",
      telephone: "+237698765432",
      adresse: "45 avenue Victor Hugo, Lyon, France",
      facturation: "Adresse différente : 78 rue de Lille, Lille, France",
    },
  },
  {
    id: "#10004",
    produit: "Rolex",
    date: "2024-02-15T00:00:00",
    statut: "Annulée",
    paiement: "OM",
    prix: 7500,
    priseEnCharge: false,
    client: {
      nom: "Nsoga David",
      email: "dan@example.com",
      telephone: "+237698765432",
      adresse: "45 avenue Victor Hugo, Lyon, France",
      facturation: "Adresse différente : 78 rue de Lille, Lille, France",
    },
  },
];

const TableauClient = () => {
  const [ongletActif, setOngletActif] = useState("Toutes");
  const [commandes, setCommandes] = useState(commandesInitiales);
  const [total, setTotal] = useState(0);
  const [commandeSelectionnee, setCommandeSelectionnee] = useState(
    commandesInitiales[0]
  );

  useEffect(() => {
    const newTotal = () => {
      const newCount = commandes.reduce((acc, ele) => {
        acc += Number(ele.prix);
        return ;
      },{});
      setTotal(newCount);
    };
    newTotal();
  }, [total]);

  const [recherche, setRecherche] = useState("");
  const [triAsc, setTriAsc] = useState(true);

  const commandesFiltrees = commandes
    .filter(
      (cmd) =>
        (ongletActif === "Toutes" || cmd.statut === ongletActif) &&
        (cmd.id.toLowerCase().includes(recherche.toLowerCase()) ||
          cmd.produit.toLowerCase().includes(recherche.toLowerCase()))
    )
    .sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return triAsc ? dateA - dateB : dateB - dateA;
    });

  useEffect(() => {
    if (
      commandesFiltrees.length &&
      !commandesFiltrees.includes(commandeSelectionnee)
    ) {
      setCommandeSelectionnee(commandesFiltrees[0]);
    }
  }, [commandesFiltrees]);

  const prendreEnCharge = (id) => {
    const nouvellesCommandes = commandes.map((cmd) =>
      cmd.id === id
        ? { ...cmd, priseEnCharge: true, statut: "En traitement" }
        : cmd
    );
    setCommandes(nouvellesCommandes);
    setCommandeSelectionnee(nouvellesCommandes.find((cmd) => cmd.id === id));
  };

  return (
    <div className="p-6 space-y-6">
      {/* En-tête */}
      <div className="flex justify-between items-center">
        <div className="space-y-1">
          <button className="text-sm text-gray-500">Retour aux clients</button>
          {commandeSelectionnee && (
            <h1 className="text-2xl font-bold">
              {commandeSelectionnee.client.nom}
            </h1>
          )}
        </div>
        <div className="flex items-center gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Rechercher"
              className="w-60 input input-bordered pl-10"
              value={recherche}
              onChange={(e) => setRecherche(e.target.value)}
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <input
            type="month"
            className="w-60 input input-bordered"
            defaultValue="2022-01"
          />
          <FiBell className="w-5 h-5 text-gray-500" />
          <FiHelpCircle className="w-5 h-5 text-gray-500" />
          <button className="btn bg-white text-gray-500">
            Voir la boutique
          </button>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-4 gap-4">
        {[
          {
            titre: "Coût total",
            valeur: total,
            note: "Coût total des commandes affichées",
            icon: <FiCreditCard />,
          },
          {
            titre: "Total des commandes",
            valeur: `${commandes.length} 🟡`,
            note: "Toutes les commandes",
            icon: <FiAlertTriangle />,
          },
          {
            titre: "Complétées",
            valeur: `${
              commandes.filter((c) => c.statut === "Complétée").length
            } 🟢`,
            note: "Commandes terminées",
            icon: <FcPositiveDynamic />,
          },
          {
            titre: "Annulées",
            valeur: `${
              commandes.filter((c) => c.statut === "Annulée").length
            } 🔴`,
            note: "Commandes annulées",
            icon: <FaRecycle />,
          },
        ].map((stat, idx) => (
          <div key={idx} className="card bg-base-100 shadow">
            <div className="card-body p-4">
              <div className="flex gap-1 items-center">
                <span className="font-semibold">{stat.icon}</span>
                <p className="text-sm text-gray-500">{stat.titre}</p>
              </div>
              <h2 className="text-xl font-bold">{idx===0? stat.valeur+"FCFA" : stat.valeur }</h2>
              <p className="text-xs text-gray-400">{stat.note}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Informations client et commandes */}
      <div className="grid grid-cols-4 gap-6">
        {/* Info client */}
        <div className="col-span-1 space-y-4">
          {commandeSelectionnee && (
            <>
              <div className="rounded-bl-md rounded-br-md bg-base-100 shadow">
                <div className="card-header p-3 bg-base-200 rounded-tl-md rounded-tr-md">
                  <div className="font-semibold flex justify-between items-center">
                    <p className="text-sm font-bold">
                      Last order{">"}10000FCFA
                    </p>
                    <div className="flex gap-2">
                      <button className="p-2 bg-white rounded-lg">
                        {commandeSelectionnee.priseEnCharge ? (
                          <FaInbox />
                        ) : (
                          <FaShippingFast />
                        )}
                      </button>
                      <button className="p-2 bg-white rounded-lg">
                        <FiMoreVertical />
                      </button>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 font-semibold">
                    Date: {commandeSelectionnee.date}
                  </p>
                </div>
                <div className="card-body p-4 space-y-2">
                  <h3 className="font-semibold">Order Details</h3>
                  <p className="flex justify-between">
                    <span className="text-gray-600 text-sm">Prix</span>
                    <span> {commandeSelectionnee.prix} FCFA</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 text-sm">
                      Total (Tax, prix)
                    </span>
                    <span>{commandeSelectionnee.paiement}</span>
                  </p>
                  <div
                    className={`divide  bg-gray-300 rounded-full`}
                    style={{ height: "1px" }}
                  ></div>
                  <div className="flex">
                    <div className="">
                      <h3 className="font-semibold mb-1">
                        Shipping informations
                      </h3>
                      <p className="flex justify-between">
                        <span className="text-gray-600 text-xs">
                          {commandeSelectionnee.client.adresse}
                        </span>
                      </p>
                    </div>
                    <div className="">
                      <h3 className="font-semibold mb-1">
                        Billing informations
                      </h3>
                      <p className="flex justify-between">
                        <span className="text-gray-600 text-sm">
                          Same as shipping address
                        </span>
                      </p>
                    </div>
                  </div>
                  <div
                    className={`divide  bg-gray-300 rounded-full`}
                    style={{ height: "1px" }}
                  ></div>
                  <h3 className="font-semibold">Customer informations</h3>
                  <p className="flex justify-between">
                    <span className="text-gray-600 text-sm">Nom</span>
                    <span className="font-bold">
                      {commandeSelectionnee.client.nom}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 text-sm">Email</span>
                    <span className="font-bold">
                      {commandeSelectionnee.client.email}
                    </span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-gray-600 text-sm">Telephone</span>
                    <span className="font-bold">
                      {commandeSelectionnee.client.telephone}
                    </span>
                  </p>
                </div>
              </div>
              <div className="card bg-base-100 shadow">
                <div className="card-body p-4">
                  <h3 className="font-semibold mb-2">Activité récente</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>💬 Chat en direct le vendredi 6 janvier 2022</li>
                    <li>⭐ Évaluation donnée le lundi 9 janvier 2022</li>
                    {commandeSelectionnee.priseEnCharge && (
                      <li>📦 Commande prise en charge</li>
                    )}
                  </ul>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="btn btn-primary w-full">Appeler</button>
                <button className="btn btn-outline w-full">Message</button>
              </div>
            </>
          )}
        </div>

        {/* Commandes */}
        <div className="col-span-3 space-y-4">
          <div role="tablist" className="flex gap-2 ">
            {["Toutes", "En traitement", "Complétée", "Annulée"].map((tab) => (
              <button
                key={tab}
                role="tab"
                className={`tab transition-shadow  ${
                  ongletActif === tab
                    ? " font-semibold text-xs max-w-40 text-gray-600 bg-gray-100  rounded-md"
                    : " font-semibold text-xs max-w-40 text-gray-400 border border-gray-200  rounded-md"
                }`}
                onClick={() => setOngletActif(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="overflow-x-auto rounded-md border">
            <table className="table table-zebra text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="text-left">ID</th>
                  <th className="text-left">Nom du produit</th>
                  <th
                    className="text-left cursor-pointer"
                    onClick={() => setTriAsc(!triAsc)}
                  >
                    Date {triAsc ? "⬆️" : "⬇️"}
                  </th>
                  <th className="text-left">Statut</th>
                  <th className="text-left">Paiement</th>
                  <th className="text-left">Prix</th>
                  <th className="text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {commandesFiltrees.map((cmd, i) => (
                  <tr key={i} className="cursor-pointer hover:bg-gray-100">
                    <td onClick={() => setCommandeSelectionnee(cmd)}>
                      {cmd.id}
                    </td>
                    <td onClick={() => setCommandeSelectionnee(cmd)}>
                      {cmd.produit}
                    </td>
                    <td onClick={() => setCommandeSelectionnee(cmd)}>
                      {cmd.date.split("T")[0]}
                    </td>
                    <td
                      className={
                        cmd.statut === "Complétée"
                          ? "text-green-600"
                          : cmd.statut === "Annulée"
                          ? "text-red-600"
                          : "text-yellow-600"
                      }
                    >
                      {cmd.statut}
                    </td>
                    <td>{cmd.paiement}</td>
                    <td>{cmd.prix} FCFA</td>
                    <td>
                      {!cmd.priseEnCharge && cmd.statut === "En traitement" && (
                        <button
                          className="btn btn-xs btn-outline"
                          onClick={() => prendreEnCharge(cmd.id)}
                        >
                          Prendre en charge
                        </button>
                      )}
                      {cmd.priseEnCharge && (
                        <span className="text-green-500 text-xs">
                          Déjà pris en charge
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableauClient;
