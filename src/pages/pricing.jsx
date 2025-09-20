import React, { useState, useEffect } from "react";
import { getAllPlans } from "../models/PlanModel";
import { motion } from "framer-motion";
import Navigation from "../nav";
import Footer from "../footer";
import { useNavigate } from "react-router-dom";
import CardSkeleton from "../components/CardSkeleton";
import { FaApple } from "react-icons/fa";

export default function PricingPage() {
  const navigate = useNavigate();

  const [tab, setTab] = useState("standard");
  const [emplacements, setEmplacements] = useState(10);
  const [duree, setDuree] = useState(1);
  const [abonnements, setAbonnements] = useState([]);
  const [versionBeta, setVersionBeta] = useState(false);

  useEffect(() => {
    async function fetchPlans() {
      try {
        const plansFromDb = await getAllPlans();
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
  const prixTotal = emplacements * prixParEmplacement * duree;

  if (!versionBeta) {
    return (
      <div className="min-h-screen bg-base-100 text-base-content">
        <Navigation />

        <div className="text-center mb-16 p-4">
          <div className="flex justify-center">
            <div className="border border-dashed border-green-800 p-3 rounded-md mb-4 md:mb-2 w-2/3 md:w-1/3 flex gap-1 justify-between items-center bg-green-100">
              <FaApple className="text-xl md:text-3xl" />
              <p className="text-[10px] md:text-xs text-gray-600 font-semibold">
                Votre marketplace bientôt disponible sur les systèmes iOS.
              </p>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Offre de lancement Bêta
          </h1>
          <p className="text-lg max-w-2xl mx-auto text-gray-600 ">
            Rejoignez Buyticle gratuitement pendant la phase bêta.
          </p>
        </div>

        <div className="max-w-xl mx-auto pb-6 md:p-2 p-4 pt-10 md:pt-0">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="card border border-green-800 shadow-sm bg-gray-050"
          >
            <div className="card-body text-center">
              <div className="flex justify-center items-center gap-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  class="size-8"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15.362 5.214A8.252 8.252 0 0 1 12 21 8.25 8.25 0 0 1 6.038 7.047 8.287 8.287 0 0 0 9 9.601a8.983 8.983 0 0 1 3.361-6.867 8.21 8.21 0 0 0 3 2.48Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 18a3.75 3.75 0 0 0 .495-7.468 5.99 5.99 0 0 0-1.925 3.547 5.975 5.975 0 0 1-2.133-1.001A3.75 3.75 0 0 0 12 18Z"
                  />
                </svg>

                <h2 className="card-title text-3xl mb-2">
                  Formule Beta Limitée
                </h2>
              </div>

              <p className="text-gray-500 mb-4">
                Profitez de toutes les fonctionnalités sans frais pendant notre
                phase de test.
              </p>
              <div className="text-5xl font-bold text-primary mb-4">0 FCFA</div>
              <ul className="space-y-2 text-sm mb-6">
                <li className="flex items-center justify-center gap-2">
                  <span className="text-success">✔</span> Accès complet à la
                  plateforme
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-success">✔</span> Support gratuit
                </li>
                <li className="flex items-center justify-center gap-2">
                  <span className="text-success">✔</span> Nombre illimité de
                  produits
                </li>
              </ul>
              <button
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      plan: {
                        title: "Formule Beta Limitée",
                        description: "Accès complet gratuit pendant la beta",
                        price: 0,
                        features: [
                          "Accès complet",
                          "Support gratuit",
                          "Nombre illimité de produits",
                        ],
                        custom: true,
                      },
                    },
                  })
                }
                className="btn btn-primary w-full"
              >
                S’inscrire gratuitement
              </button>
            </div>
          </motion.div>
        </div>

        <div className="max-w-full flex items-center justify-center p-6 text-center bg-primary"> Pour vous permettre d’évaluer la pertinence de notre service, nous mettons à votre disposition une version bêta complète. Profitez de l’expérience Buyticle dès maintenant.</div>

        <Footer />
      </div>
    );
  }

  //
  return (
    <div className="min-h-screen bg-base-100 text-base-content">
      <Navigation />

      <div className="text-center mb-16 p-4">
        <div className="flex justify-center">
          <div className="border border-dashed border-green-800 p-3 rounded-md mb-4 md:mb-2 w-2/3 md:w-1/3 flex gap-1 justify-between items-center bg-green-100">
            <FaApple className="text-xl md:text-3xl" />
            <p className="text-[10px] md:text-xs text-gray-600 font-semibold">
              Votre marketplace bientôt disponible sur les systèmes iOS.
            </p>
          </div>
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-4">
          Tarifs simples et transparents
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-600">
          Choisissez une formule adaptée à votre business.
        </p>
      </div>

      <div className=" justify-center mb-12 flex flex-col md:flex-row gap-4 p-2">
        <button
          onClick={() => setTab("standard")}
          className={`btn btn-md mx-4 md:btn-lg rounded-full ${
            tab === "standard"
              ? "bg-green-900 text-white hover:bg-green-700"
              : "btn-outline"
          }`}
        >
          Formules Standard
        </button>
        <button
          onClick={() => setTab("personnalisable")}
          className={`btn btn-md mx-4 md:btn-lg rounded-full ${
            tab === "personnalisable"
              ? "bg-green-900 text-white hover:bg-green-700"
              : "btn-outline"
          }`}
        >
          Formule Personnalisable
        </button>
      </div>

      {tab === "standard" ? (
        // Partie formules standards
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
                      <div className="badge text-white bg-gradient-to-r from-green-500 to-fuchsia-600 absolute top-4 right-4">
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
                  <span className="text-success">✔</span> Boutique 100%
                  personnalisable
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-success">✔</span> Support prioritaire
                </li>
              </ul>

              {/* Bouton */}
              <button
                onClick={() =>
                  navigate("/payment", {
                    state: {
                      plan: {
                        title: "Formule Personnalisable",
                        description: `${emplacements} produits - ${duree} mois`,
                        price: prixTotal,
                        features: [
                          "Paiement sécurisé",
                          "Boutique 100% personnalisable",
                          "Support prioritaire",
                        ],
                        custom: true, 
                        emplacements,
                        duree,
                      },
                    },
                  })
                }
                className="btn btn-primary w-full mt-6"
              >
                Choisir cette formule
              </button>
            </div>
          </motion.div>

          {/* Bloc Contact */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="card bg-gradient-to-r from-green-900 to-green-700 text-primary-content p-8 shadow-xl"
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
              <button
                onClick={() => navigate("/contact")}
                className="btn btn-outline w-full bg-base-100 text-primary hover:bg-base-200"
              >
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
