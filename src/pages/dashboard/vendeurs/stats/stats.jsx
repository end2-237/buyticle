import React, { useState, useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Line, Doughnut } from "react-chartjs-2";
import {
  FiTrendingUp,
  FiTrendingDown,
  FiChevronDown,
  FiBarChart2,
  FiUsers,
  FiShoppingCart,
  FiPackage,
  FiDollarSign,
  FiActivity,
  FiMapPin,
  FiUser,
} from "react-icons/fi";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  ArcElement,
  Tooltip,
  Legend
);

const periodsFR = ["7 derniers jours", "30 derniers jours", "Dernier trimestre", "Dernière année"];

const Tab = ({ label, active, onClick, icon }) => (
  <button
    className={`flex items-center gap-2 px-5 py-3 rounded-t-lg text-sm font-semibold transition-colors duration-300 ${
      active
        ? "bg-white text-blue-600 border-t-4 border-gray-600 shadow-md"
        : "text-gray-400 hover:text-blue-500"
    }`}
    onClick={onClick}
  >
    {icon} {label}
  </button>
);

const DashboardSummary = () => {
  const [selectedPeriod, setSelectedPeriod] = useState(periodsFR[1]);
  const [activeTab, setActiveTab] = useState("Aperçu");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Données simulées (à remplacer par API ou state réel)
  const chiffreAffaires = [
    { nom: "Chiffre d'affaires total", valeur: "21 350 000 FCFA", croissance: "+21,1%" },
    { nom: "Commandes", valeur: "8 230", croissance: "+12,4%" },
    { nom: "Nouveaux clients", valeur: "1 024", croissance: "+8,9%" },
    { nom: "Clients actifs", valeur: "573", croissance: "+20,1%" },
  ];

  const meilleursProduits = [
    { nom: "Écouteurs sans fil", ventes: 3200 },
    { nom: "Montre connectée", ventes: 2900 },
    { nom: "Enceinte Bluetooth", ventes: 2500 },
    { nom: "Chaussures de running", ventes: 2200 },
  ];

  const dataRegions = {
    labels: ["Amérique du Nord", "Europe", "Asie", "Amérique du Sud", "Afrique"],
    datasets: [
      {
        data: [300, 250, 200, 150, 100],
        backgroundColor: ["#60a5fa", "#34d399", "#facc15", "#fb7185", "#a78bfa"],
      },
    ],
  };

  const dataGenres = {
    labels: ["Homme", "Femme", "Non-binaire"],
    datasets: [
      {
        data: [55, 40, 5],
        backgroundColor: ["#3b82f6", "#ec4899", "#a855f7"],
      },
    ],
  };

  const tabs = [
    { label: "Aperçu", icon: <FiBarChart2 size={18} /> },
    { label: "Produits", icon: <FiShoppingCart size={18} /> },
    { label: "Audience", icon: <FiUsers size={18} /> },
    { label: "Ventes", icon: <FiActivity size={18} /> },
    { label: "Logistique", icon: <FiPackage size={18} /> },
    { label: "Finance", icon: <FiDollarSign size={18} /> },
    { label: "Tunnel de conversion", icon: <FiMapPin size={18} /> },
  ];

  const renderCroissance = (croissance) => {
    const positif = croissance.startsWith("+");
    return (
      <p
        className={`flex items-center gap-1 text-sm font-semibold ${
          positif ? "text-green-600" : "text-red-500"
        }`}
      >
        {positif ? <FiTrendingUp /> : <FiTrendingDown />} {croissance} depuis le mois dernier
      </p>
    );
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "Aperçu":
        return (
          <section className="space-y-8">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-4">
              Résumé du tableau de bord
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
              {chiffreAffaires.map((item) => (
                <div
                  key={item.nom}
                  className="bg-white p-6 rounded-3xl shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <p className="text-gray-400 uppercase text-xs tracking-wide mb-1">{item.nom}</p>
                  <p className="text-3xl font-extrabold text-gray-900 mb-2">{item.valeur}</p>
                  {renderCroissance(item.croissance)}
                </div>
              ))}
            </div>
          </section>
        );

      case "Produits":
        return (
          <section className="bg-white p-6 rounded-3xl shadow-md">
            <h3 className="text-2xl font-bold text-gray-800 border-b pb-2 mb-6 flex items-center gap-3">
              <FiShoppingCart size={24} className="text-blue-600" /> Meilleurs produits
            </h3>
            <ul className="divide-y divide-gray-200">
              {meilleursProduits.map((produit, i) => (
                <li
                  key={produit.nom}
                  className="flex justify-between py-4 items-center hover:bg-blue-50 rounded-lg px-3 transition-colors duration-200"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-gray-600 font-semibold">{i + 1}.</span>
                    <span className="text-gray-800 font-medium">{produit.nom}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-semibold">
                    {produit.ventes.toLocaleString()} ventes
                  </span>
                </li>
              ))}
            </ul>
          </section>
        );

      case "Audience":
        return (
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <FiUsers size={24} className="text-green-600" /> Répartition par régions
              </h3>
              <Doughnut data={dataRegions} />
              <p className="mt-6 text-gray-600 text-sm italic">
                Les régions où la majorité de vos clients sont situés.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <FiUser size={24} className="text-pink-500" /> Répartition par genre
              </h3>
              <Doughnut data={dataGenres} />
              <p className="mt-6 text-gray-600 text-sm italic">
                Analyse de la diversité de votre audience par genre.
              </p>
            </div>
            <div className="bg-white rounded-3xl shadow-md p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-2">
                <FiMapPin size={24} className="text-purple-600" /> Localisation des clients
              </h3>
              <div className="h-64 bg-gray-100 rounded-xl flex items-center justify-center text-gray-400 italic select-none">
                Carte interactive à intégrer ici
              </div>
              <p className="mt-4 text-gray-600 text-sm italic">
                Visualisez la localisation géographique de vos acheteurs.
              </p>
            </div>
          </section>
        );

      case "Ventes":
        return (
          <section className="bg-white rounded-3xl shadow-md p-6 ">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
              <FiActivity size={24} className="text-indigo-600" /> Évolution des ventes
            </h3>
            <Line
              data={{
                labels: ["Jan", "Fév", "Mar", "Avr", "Mai"],
                datasets: [
                  {
                    label: "Ventes (en FCFA)",
                    data: [5000000, 7000000, 8500000, 9000000, 11000000],
                    borderColor: "#4f46e5",
                    backgroundColor: "rgba(79, 70, 229, 0.2)",
                    fill: true,
                    tension: 0.3,
                    pointRadius: 5,
                    pointHoverRadius: 7,
                  },
                ],
              }}
              options={{
                responsive: true,
                plugins: {
                  legend: { display: true, labels: { color: "#374151" } },
                  tooltip: { mode: "index", intersect: false },
                },
                scales: {
                  y: {
                    ticks: {
                      callback: (value) => `${value / 1000000}M FCFA`,
                      color: "#4b5563",
                    },
                    grid: { color: "#e5e7eb" },
                  },
                  x: {
                    ticks: { color: "#4b5563" },
                    grid: { display: false },
                  },
                },
                interaction: { mode: "nearest", axis: "x", intersect: false },
              }}
            />
          </section>
        );

      case "Logistique":
        return (
          <section className="bg-white rounded-3xl shadow-md p-6 space-y-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
              <FiPackage size={24} className="text-yellow-500" /> Logistique & livraison
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-blue-700">2,3 jours</p>
                <p className="text-gray-500 text-sm mt-1">Délai moyen d’expédition</p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-red-600">4 %</p>
                <p className="text-gray-500 text-sm mt-1">Retards de livraison</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-yellow-600">23</p>
                <p className="text-gray-500 text-sm mt-1">Commandes en attente</p>
              </div>
            </div>
          </section>
        );

      case "Finance":
        return (
          <section className="bg-white rounded-3xl shadow-md p-6 space-y-6">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
              <FiDollarSign size={24} className="text-green-700" /> Finances & paiements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-green-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-green-800">45 000 000 FCFA</p>
                <p className="text-gray-500 text-sm mt-1">Gains totaux</p>
              </div>
              <div className="bg-yellow-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-yellow-700">2 000 000 FCFA</p>
                <p className="text-gray-500 text-sm mt-1">Paiements en attente</p>
              </div>
              <div className="bg-red-50 rounded-xl p-5 shadow flex flex-col items-center">
                <p className="text-xl font-extrabold text-red-600">3 200 000 FCFA</p>
                <p className="text-gray-500 text-sm mt-1">Commission versée</p>
              </div>
            </div>
          </section>
        );

      case "Tunnel de conversion":
        return (
          <section className="bg-white rounded-3xl shadow-md p-6 space-y-4">
            <h3 className="text-2xl font-bold mb-4 text-gray-800 flex items-center gap-3">
              <FiActivity size={24} className="text-indigo-600" /> Tunnel de conversion
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-6">
              {[
                { label: "Vues", value: "10 000" },
                { label: "Ajouts au panier", value: "2 500" },
                { label: "Début de commande", value: "1 300" },
                { label: "Commandes complétées", value: "900" },
                { label: "Taux de conversion", value: "9 %" },
              ].map(({ label, value }) => (
                <div
                  key={label}
                  className="bg-blue-50 rounded-xl p-5 shadow flex flex-col items-center"
                >
                  <p className="text-xl font-extrabold text-blue-700">{value}</p>
                  <p className="text-gray-600 text-sm mt-1">{label}</p>
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 text-gray-900 flex flex-col">
      {/* En-tête principal */}
      <header className="bg-white shadow-md p-6">
        <h1 className="text-4xl font-extrabold tracking-tight text-green-950 flex items-center gap-3">
          <FiBarChart2 size={36} /> Tableau de bord
        </h1>
        <p className="text-gray-600 mt-1">Analyse complète de vos données commerciales</p>
      </header>

      {/* Barre de navigation par onglets */}
      <nav className="sticky top-0 bg-gray-100 border-b border-gray-200 z-10">
        <div className="max-w-7xl mx-auto flex overflow-x-auto no-scrollbar">
          {tabs.map(({ label, icon }) => (
            <Tab
              key={label}
              label={label}
              icon={icon}
              active={activeTab === label}
              onClick={() => setActiveTab(label)}
            />
          ))}

          {/* Dropdown des périodes */}
          <div
            className="relative ml-auto mr-4"
            ref={dropdownRef}
          >
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 hover:bg-gray-50 transition duration-300"
              aria-haspopup="true"
              aria-expanded={dropdownOpen}
            >
              {selectedPeriod} <FiChevronDown />
            </button>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-20">
                {periodsFR.map((period) => (
                  <li key={period}>
                    <button
                      className={`block w-full px-4 py-2 text-left text-sm ${
                        selectedPeriod === period
                          ? "bg-blue-100 text-blue-700 font-semibold"
                          : "hover:bg-gray-100"
                      }`}
                      onClick={() => {
                        setSelectedPeriod(period);
                        setDropdownOpen(false);
                      }}
                    >
                      {period}
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <section className="flex-grow max-w-7xl mx-auto px-6 py-8">
        {renderTabContent()}
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 py-6 mt-auto">
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center text-gray-500 text-sm">
          <p>© 2025 MonEntreprise. Tous droits réservés.</p>
          <p>
            Design moderne par <a href="#" className="text-blue-600 hover:underline">TonNom</a>
          </p>
        </div>
      </footer>
    </main>
  );
};

export default DashboardSummary;
