import React, { useEffect } from "react";
import bg from "../assets/bullet2.png";
import personIcon from "../assets/account.gif";

export default function Modal({ isOpen, onClose, onConfirm }) {
  // Désactive le scroll du body quand la modal est ouverte
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => (document.body.style.overflow = "auto");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 backdrop-blur-sm"
      style={{
        backgroundImage: `url(${bg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="bg-white bg-opacity-95 backdrop-blur-lg rounded-xl shadow-2xl max-w-sm w-full p-6 text-center animate-fade-in border border-gray-200">
        <img src={personIcon} alt="Connexion requise" className="w-24 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-800 mb-2">
          Connexion requise
        </h2>
        <p className="text-gray-600 mb-6">
          Vous devez être connecté à un compte vendeur pour effectuer le paiement.
        </p>
        <div className="flex justify-center gap-4">
          <button
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300 transition font-medium"
            onClick={onClose}
          >
            Annuler
          </button>
          <button
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium"
            onClick={onConfirm}
          >
            Se connecter
          </button>
        </div>
      </div>
    </div>
  );
}
