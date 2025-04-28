import React, { useState, useEffect } from "react";
import { getAllPlans } from "../models/PlanModel";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";
import { Link, useNavigate } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";

export default function PricingPage() {
  const navigate = useNavigate();
  const [tab, setTab] = useState("standard");
  const [emplacements, setEmplacements] = useState(10);
  const [duree, setDuree] = useState(1); // 👈 durée en mois
  const [abonnements, setAbonnements] = useState([]);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const plansFromDb = await getAllPlans();
        console.log("Plans récupérés:", plansFromDb);
        const normalizedPlans = plansFromDb.map((plan) => ({
          id: plan.id,
          highlight: plan.Highlight || false,
          title: plan.Title || "",
          description: plan.Description || "",
          price: plan.Price || "",
          button: plan.Button || "",
          features: plan.Features || [],
        }));

        setAbonnements(normalizedPlans);
      } catch (error) {
        console.error("Erreur lors de la récupération des plans :", error);
      }
    }

    fetchPlans();
  }, []);

  const prixParEmplacement = 500;
  const prixTotal = emplacements * prixParEmplacement * duree; // 👈 prix en fonction de la durée choisie

  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navigation />

      <div className="text-center mb-16 p-4">
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Tarifs simples et transparents
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Choisissez une formule adaptée à votre business.
        </p>
      </div>

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

      {tab === "standard" ? (
        // Partie formules standards (identique)
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto p-4 pb-8">
          {abonnements.length === 0
            ? Array.from({ length: 4 }).map((_, index) => (
                <CardSkeleton key={index} />
              ))
            : abonnements.map((plan, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.5 }}
                  className={`card shadow-xl border ${
                    plan.highlight
                      ? "border-primary scale-105"
                      : "border-gray-200"
                  }`}
                >
                  <div className="card-body flex flex-col">
                    {plan.highlight && (
                      <div className="badge text-white bg-gradient-to-r from-blue-500 to-fuchsia-600 absolute top-4 right-4">
                        Plus Populaire
                      </div>
                    )}

                    <div>
                      <h2 className="card-title">{plan.title}</h2>
                      <p className="text-gray-500">{plan.description}</p>
                      <div className="text-3xl font-bold my-4">
                        {plan.price} FCFA
                      </div>
                    </div>

                    <div className="flex-1 flex flex-col justify-between">
                      <ul className="space-y-2 text-sm mb-6">
                        {plan.features?.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <span className="text-success">✔</span>
                            {feature}
                          </li>
                        ))}
                      </ul>

                      <div className="pt-4">
                        <button
                          onClick={() =>
                            navigate("/payment", { state: { plan } })
                          }
                          className={`btn w-full ${
                            plan.highlight ? "btn-primary" : "btn-outline"
                          }`}
                        >
                          {plan.button}
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
        </div>
      ) : (
        // Partie Formule Personnalisable améliorée
        <div className="max-w-6xl mx-auto p-4 grid md:grid-cols-3 gap-8">
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

              {/* Nombre d'emplacements */}
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

              {/* Sélection de durée */}
              <div className="flex flex-col items-center mb-8">
                <label htmlFor="duree" className="text-sm mb-2">
                  Durée d'abonnement :
                </label>
                <select
                  id="duree"
                  value={duree}
                  onChange={(e) => setDuree(parseInt(e.target.value))}
                  className="select select-primary w-full max-w-xs"
                >
                  <option value={1}>1 mois</option>
                  <option value={3}>3 mois</option>
                  <option value={6}>6 mois</option>
                  <option value={12}>12 mois</option>
                </select>
              </div>

              {/* Prix total */}
              <div className="text-center mb-10">
                <div className="text-5xl font-bold text-primary">
                  {prixTotal.toLocaleString()} FCFA
                </div>
                <div className="text-gray-500 mt-2 text-sm">
                  pour {duree} {duree > 1 ? "mois" : "mois"}
                </div>
              </div>

              {/* Liste d'avantages */}
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Paiement sécurisé
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Boutique 100% personnalisable
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Support prioritaire
                </li>
              </ul>

              {/* Bouton */}
              <Link to={"/payment"}>
                <button className="btn btn-primary w-full mt-6">
                  Choisir cette formule
                </button>
              </Link>
            </div>
          </motion.div>

          {/* Bloc Contact */}
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
