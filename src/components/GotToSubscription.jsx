import { useNavigate } from "react-router-dom";
import lock from "../assets/coin.gif";
import background from "../assets/background-buyticle.png"; // ton image de fond générée

export default function GoToSubscription() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center px-4"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="bg-white bg-opacity-90 shadow-md rounded-xl p-8 max-w-md w-full text-center border border-gray-200 backdrop-blur-md">
        
        {/* Icône cadenas */}
        <div className="flex justify-center mb-4">
          <img src={lock} alt="Cadenas" className="size-20" />
        </div>

        {/* Titre */}
        <h1 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Votre compte vendeur n'est pas actif
        </h1>

        {/* Description */}
        <p className="text-gray-600 mb-6">
          Pour pouvoir vendre sur la plateforme, vous devez activer votre compte vendeur en souscrivant à un abonnement.
        </p>

        {/* Bouton d'action */}
        <button
          onClick={() => navigate('/pricing')}
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-3 rounded-lg transition duration-200"
        >
          Activer mon compte vendeur
        </button>

        {/* Lien d'aide */}
        <div className="mt-4 text-sm text-gray-600">
          Besoin d'aide ?{" "}
          <button
            onClick={() => navigate('/support')}
            className="text-green-600 hover:underline"
          >
            Contactez le support
          </button>
        </div>
      </div>
    </div>
  );
}
