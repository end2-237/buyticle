import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "../nav";
import success from "../assets/gifi.gif"

export default function PaymentSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    // Tu peux ici déclencher une vérification serveur si nécessaire
    // Exemple : fetch("/api/verify-payment?transaction_id=xxx")
  }, []);

  return (
    <div>
      <Navigation />
      <div className="min-h-screen flex items-center justify-center bg-base-100 p-6">
        <div className="card bg-success text-white shadow-xl p-8 max-w-xl w-full text-center space-y-6">
          <div className="flex justify-center">
            {/* <svg
              className="w-20 h-20 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5 2a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg> */}
            <img src={success} alt="" srcset="" className="size-20"/>
          </div>

          <h1 className="text-3xl font-bold">Paiement Réussi !</h1>
          <p className="text-lg">
            Merci pour votre paiement. Votre boutique est désormais activée sur Buyticle.
          </p>

          <button
            className="btn btn-neutral"
            onClick={() => navigate("/dashboard/vendeur/home")}
          >
            Aller à mon Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
