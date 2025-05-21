import { useState } from "react";
import { FiInfo } from "react-icons/fi";

const suggestions = [
  {
    title: "Demander une offre spéciale",
    subtitle: "Appeler pour plus de détails",
    icon: "📢",
  },
  {
    title: "Livraison directe de la ferme",
    subtitle: "Commander maintenant",
    icon: "🚚",
  },
  {
    title: "Réduction sur la première commande",
    subtitle: "Acheter maintenant",
    icon: "💳",
  },
  {
    title: "Cadeau spécial pour le Black Friday",
    subtitle: "En savoir plus",
    icon: "🎁",
  },
];

const PersonalizedCTA = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div className="flex flex-col md:flex-row justify-between gap-8 p-6 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      {/* Gauche */}
      <div className="md:w-1/2 space-y-4">
        <h2 className="text-2xl font-bold">Créer un CTA personnalisé</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Encouragez vos clients à vous contacter facilement grâce à des actions adaptées à votre entreprise.
        </p>

        <div className="flex items-center gap-2 mt-4 text-sm font-medium text-gray-700 dark:text-gray-300">
          Recommandé pour des entreprises similaires
          <FiInfo />
        </div>

        <div className="space-y-3">
          {suggestions.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              className={`w-full text-left border px-4 py-3 rounded-md flex items-center justify-between hover:bg-gray-100 dark:hover:bg-gray-800 transition ${
                selected === index
                  ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                  : "border-gray-300 dark:border-gray-700"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="text-xl">{item.icon}</div>
                <div>
                  <div className="font-medium">{item.title}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {item.subtitle}
                  </div>
                </div>
              </div>
              <span className="text-gray-400">{">"}</span>
            </button>
          ))}
        </div>

        <div className="text-center my-2 text-sm text-gray-500">OU</div>

        <button className="w-full bg-blue-600 text-white py-2 rounded-md font-semibold hover:bg-blue-700 transition">
          Créer un appel à l'action personnalisé
        </button>
      </div>

      {/* Droite */}
      <div className="md:w-1/2 flex justify-center items-start">
        <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-6 w-72">
          <div className="bg-white dark:bg-gray-900 rounded shadow p-4">
            <div className="text-sm font-semibold text-gray-800 dark:text-white">
              🎉 12e Anniversaire
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-300">
              Profitez de 150 € de bons de réduction
            </div>
            <button className="mt-3 bg-emerald-600 text-white text-sm px-3 py-1 rounded hover:bg-emerald-700 transition">
              Appel à l'action
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalizedCTA;
