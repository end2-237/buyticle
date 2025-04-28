import React, { useState } from "react";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";

export default function PricingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("standard"); // "standard" ou "personnalisable"
  const [emplacements, setEmplacements] = useState(10); // nombre d'emplacements dans formule personnalisable

  const abonnements = [
    // LIGHT
    {
      title: "Light - 2 semaines",
      description: "Idéal pour commencer la vente en ligne.",
      price: "0 FCFA / 2 semaines",
      duration: "2 semaines",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Light 2 semaines",
      highlight: false,
    },
    {
      title: "Light - 1 mois",
      description: "Idéal pour commencer la vente en ligne.",
      price: "6 000 FCFA / mois",
      duration: "1 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Light 1 mois",
      highlight: true,
    },
    {
      title: "Light - 3 mois",
      description: "Idéal pour commencer la vente en ligne.",
      price: "18 000 FCFA / 3 mois",
      duration: "3 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Light 3 mois",
      highlight: false,
    },
    {
      title: "Light - 1 an",
      description: "Idéal pour commencer la vente en ligne.",
      price: "72 000 FCFA / an",
      duration: "1 an",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Light 1 an",
      highlight: false,
    },

    // STARTER
    {
      title: "Starter - 2 semaines",
      description: "Pour débuter sérieusement.",
      price: "3 000 FCFA / 2 semaines",
      duration: "2 semaines",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Starter 2 semaines",
      highlight: false,
    },
    {
      title: "Starter - 1 mois",
      description: "Pour débuter sérieusement.",
      price: "6 000 FCFA / mois",
      duration: "1 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Starter 1 mois",
      highlight: false,
    },
    {
      title: "Starter - 3 mois",
      description: "Pour débuter sérieusement.",
      price: "18 000 FCFA / 3 mois",
      duration: "3 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Starter 3 mois",
      highlight: true,
    },
    {
      title: "Starter - 1 an",
      description: "Pour débuter sérieusement.",
      price: "72 000 FCFA / an",
      duration: "1 an",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "2 Comptes équipe",
        "2% de frais transactionnels",
      ],
      button: "Choisir Starter 1 an",
      highlight: false,
    },

    // PRO
    {
      title: "Pro - 2 semaines",
      description: "Parfait pour scaler.",
      price: "6 000 FCFA / 2 semaines",
      duration: "2 semaines",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "5 Comptes équipe",
        "1% de frais transactionnels",
        "Support prioritaire",
      ],
      button: "Choisir Pro 2 semaines",
      highlight: false,
    },
    {
      title: "Pro - 1 mois",
      description: "Parfait pour scaler.",
      price: "12 000 FCFA / mois",
      duration: "1 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "5 Comptes équipe",
        "1% de frais transactionnels",
        "Support prioritaire",
      ],
      button: "Choisir Pro 1 mois",
      highlight: true,
    },
    {
      title: "Pro - 3 mois",
      description: "Parfait pour scaler.",
      price: "36 000 FCFA / 3 mois",
      duration: "3 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "5 Comptes équipe",
        "1% de frais transactionnels",
        "Support prioritaire",
      ],
      button: "Choisir Pro 3 mois",
      highlight: false,
    },
    {
      title: "Pro - 1 an",
      description: "Parfait pour scaler.",
      price: "144 000 FCFA / an",
      duration: "1 an",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "5 Comptes équipe",
        "1% de frais transactionnels",
        "Support prioritaire",
      ],
      button: "Choisir Pro 1 an",
      highlight: false,
    },

    // ENTREPRISE
    {
      title: "Entreprise - 2 semaines",
      description: "Solutions sur mesure.",
      price: "Sur devis",
      duration: "2 semaines",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "15 Comptes équipe",
        "0,5% de frais transactionnels",
        "Support prioritaire",
        "Migration checkout offerte",
      ],
      button: "Contactez-nous",
      highlight: false,
    },
    {
      title: "Entreprise - 1 mois",
      description: "Solutions sur mesure.",
      price: "Sur devis",
      duration: "1 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "15 Comptes équipe",
        "0,5% de frais transactionnels",
        "Support prioritaire",
        "Migration checkout offerte",
      ],
      button: "Contactez-nous",
      highlight: false,
    },
    {
      title: "Entreprise - 3 mois",
      description: "Solutions sur mesure.",
      price: "Sur devis",
      duration: "3 mois",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "15 Comptes équipe",
        "0,5% de frais transactionnels",
        "Support prioritaire",
        "Migration checkout offerte",
      ],
      button: "Contactez-nous",
      highlight: false,
    },
    {
      title: "Entreprise - 1 an",
      description: "Solutions sur mesure.",
      price: "Sur devis",
      duration: "1 an",
      features: [
        "Paiement sécurisé",
        "Boutique personnalisable",
        "1-Click Upsell",
        "Order Bump",
        "15 Comptes équipe",
        "0,5% de frais transactionnels",
        "Support prioritaire",
        "Migration checkout offerte",
      ],
      button: "Contactez-nous",
      highlight: true,
    },
  ];

  // Prix dynamique pour formule personnalisable
  const prixParEmplacement = 500; // par exemple 500 FCFA par produit
  const prixTotal = emplacements * prixParEmplacement;

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navigation />

      {/* Header */}
      <div className="text-center mb-16 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Tarifs simples et transparents
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Choisissez une formule adaptée à votre business.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center mb-12 gap-4">
        <button
          onClick={() => setTab("standard")}
          className={`btn btn-lg rounded-full ${
            tab === "standard" ? "btn-primary" : "btn-outline"
          }`}
        >
          Formules Standard
        </button>
        <button
          onClick={() => setTab("personnalisable")}
          className={`btn btn-lg rounded-full ${
            tab === "personnalisable" ? "btn-primary" : "btn-outline"
          }`}
        >
          Formule Personnalisable
        </button>
      </div>

      {/* Contenu selon Tab */}
      {tab === "standard" ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto p-4 pb-8">
          {abonnements.map((plan, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              className={`card shadow-xl border ${
                plan.highlight ? "border-primary scale-105" : "border-gray-200"
              }`}
            >
              <div className="card-body">
                {plan.highlight && (
                  <div className="badge text-white bg-gradient-to-r from-blue-500 to-fuchsia-600 absolute top-4 right-4">
                    Plus Populaire
                  </div>
                )}
                <h2 className="card-title">{plan.title}</h2>
                <p className="text-gray-500">{plan.description}</p>
                <div className="text-3xl font-bold my-4">{plan.price}</div>

                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-success">✔</span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-4">
                  <button
                    onClick={
                      () => navigate("/payment", { state: { plan } }) // on envoie tout l'objet 'plan'
                    }
                    className={`btn w-full ${
                      plan.highlight ? "btn-primary" : "btn-outline"
                    }`}
                  >
                    {plan.button}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-8">
          {/* Formule Personnalisable */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="card bg-base-200 p-8 shadow-xl border border-gray-200 col-span-2"
          >
            <div className="card-body">
              <h2 className="card-title justify-center mb-6 text-3xl">
                Formule Personnalisable
              </h2>

              <div className="flex flex-col items-center mb-8">
                <label htmlFor="emplacements" className="text-sm mb-2">
                  Nombre d'emplacements produits :
                </label>
                <input
                  type="range"
                  id="emplacements"
                  min="5"
                  max="200"
                  value={emplacements}
                  onChange={(e) => setEmplacements(parseInt(e.target.value))}
                  className="range range-primary w-full"
                />
                <div className="text-2xl font-bold mt-4">
                  {emplacements} Produits
                </div>
              </div>

              <div className="text-center mb-10">
                <div className="text-5xl font-bold text-primary">
                  {prixTotal.toLocaleString()} FCFA
                </div>
                <div className="text-gray-500 mt-2 text-sm">/ mois</div>
              </div>

              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Paiement sécurisé
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Boutique 100%
                  personnalisable
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Support prioritaire
                </li>
              </ul>

              <Link to={"/payment"}>
                <button className="btn btn-primary w-full mt-6">
                  Choisir cette formule
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Encadré Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="card bg-primary text-primary-content p-8 shadow-xl"
          >
            <div className="card-body flex flex-col justify-between">
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Besoin d'une solution sur mesure ?
                </h3>
                <p className="text-sm mb-6">
                  Contactez-nous pour un plan adapté à vos besoins spécifiques
                  et à votre volume.
                </p>
              </div>
              <button className="btn btn-outline w-full bg-base-100 text-primary hover:bg-base-200">
                Contactez-nous
              </button>
            </div>
          </motion.div>
        </div>
      )}

      <Footer />
    </div>
  );
}
