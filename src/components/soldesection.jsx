import { useState } from "react";
import { FaWallet } from "react-icons/fa";
import { FiArrowDownCircle, FiArrowUpCircle, FiDownload, FiX } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Solde() {
  const [showRetraitModal, setShowRetraitModal] = useState(false);
  const [montantRetrait, setMontantRetrait] = useState("");
  const soldeDisponible = 125000;

  const transactions = [
    { id: 1, type: "Vente", montant: 4500, date: "2025-05-20", status: "Complétée" },
    { id: 2, type: "Retrait", montant: 20000, date: "2025-05-18", status: "Complétée" },
    { id: 3, type: "Vente", montant: 3000, date: "2025-05-17", status: "Complétée" },
  ];

  const handleRetrait = () => {
    if (!montantRetrait || isNaN(montantRetrait) || Number(montantRetrait) <= 0) return;
    alert(`Retrait de ${montantRetrait} FCFA demandé !`);
    setShowRetraitModal(false);
    setMontantRetrait("");
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white">Mon solde</h1>
        <button
          onClick={() => setShowRetraitModal(true)}
          className="bg-gradient-to-r from-indigo-600 to-blue-600 hover:brightness-110 text-white px-5 py-2.5 rounded-xl shadow-lg transition"
        >
          Retirer de l'argent
        </button>
      </div>

      {/* Solde */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="grid md:grid-cols-3 gap-6 mb-10"
      >
        <div className="flex items-center p-6 bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg">
          <FaWallet className="text-4xl text-indigo-600 mr-4" />
          <div>
            <p className="text-sm text-gray-500 dark:text-gray-400">Solde disponible</p>
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
              {soldeDisponible.toLocaleString()} FCFA
            </h2>
          </div>
        </div>
      </motion.div>

      {/* Transactions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-2xl shadow-lg p-6"
      >
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Dernières transactions</h3>
          <button className="flex items-center text-sm text-indigo-600 hover:underline">
            <FiDownload className="mr-2" />
            Télécharger
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 uppercase text-xs">
                <th className="p-3 text-left">Type</th>
                <th className="p-3 text-left">Montant</th>
                <th className="p-3 text-left">Date</th>
                <th className="p-3 text-left">Statut</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx) => (
                <tr key={tx.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
                  <td className="p-3 flex items-center gap-2 text-gray-700 dark:text-white font-medium">
                    {tx.type === "Vente" ? (
                      <FiArrowDownCircle className="text-green-500" />
                    ) : (
                      <FiArrowUpCircle className="text-red-500" />
                    )}
                    {tx.type}
                  </td>
                  <td className="p-3 text-gray-700 dark:text-white">{tx.montant.toLocaleString()} FCFA</td>
                  <td className="p-3 text-gray-500 dark:text-gray-400">{tx.date}</td>
                  <td className="p-3">
                    <span className="inline-block px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-700/20 dark:text-green-300">
                      {tx.status}
                    </span>
                  </td>
                </tr>
              ))}
              {transactions.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-4 text-center text-gray-400 dark:text-gray-500">
                    Aucune transaction récente.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modale de retrait */}
      <AnimatePresence>
        {showRetraitModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-md shadow-xl"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white">Retirer de l'argent</h2>
                <button onClick={() => setShowRetraitModal(false)} className="text-gray-500 hover:text-red-500">
                  <FiX size={20} />
                </button>
              </div>

              <input
                type="number"
                placeholder="Montant en FCFA"
                value={montantRetrait}
                onChange={(e) => setMontantRetrait(e.target.value)}
                className="w-full mb-4 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-900 dark:text-white"
              />
              <button
                onClick={handleRetrait}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-xl transition"
              >
                Confirmer le retrait
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
