import Navigation from "../nav";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";

export default function PaymentPage() {
  const location = useLocation();
  const plan = location.state?.plan;
  const navigate = useNavigate();

  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [promoCode, setPromoCode] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("ORANGE_MONEY");
  const [loading, setLoading] = useState(false);

  
  async function payment() {
    if (!phone.trim()) {
      alert("Veuillez renseigner un numéro Mobile Money valide.");
      return;
    }
  
    if (!plan?.price) {
      alert("Plan invalide.");
      return;
    }
  
    setLoading(true);
  
    try {
      const response = await fetch(
        "https://us-central1-buyticle-bce3f.cloudfunctions.net/payWithMobileMoney",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: Number(plan.price),
            phone_number: phone.trim(),
          }),
        }
      );
  
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur serveur :", response.status, response.statusText, errorText);
        alert(`Erreur serveur : ${response.status} ${response.statusText}\n${errorText}`);
        setLoading(false);
        return;
      }
  
      const data = await response.json();
      console.log("Paiement réussi :", data);
  
      if (data.success) {
        // alert("Paiement réussi :\n" + JSON.stringify(data.data, null, 2));
        navigate("/payment-success");
      } else {
        console.error("Erreur lors de l'initialisation du paiement :", data);
        alert("Erreur lors de l'initialisation du paiement : " + JSON.stringify(data));
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      alert("Erreur réseau : " + error.message);
    } finally {
      setLoading(false);
    }
  }
  
  
  

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-base-100 flex items-center justify-center p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-6xl">
          {/* Partie Gauche */}
          <div className="space-y-6">
            {/* Méthode de Paiement */}
            <div className="card bg-base-200 p-6 shadow-md">
              <h2 className="text-xl font-semibold mb-4">Sélectionnez votre moyen de paiementtt</h2>
              <div className="flex flex-col gap-4">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment-method"
                    className="radio checked:bg-primary"
                    checked={paymentMethod === "ORANGE_MONEY"}
                    onChange={() => setPaymentMethod("ORANGE_MONEY")}
                  />
                  <span className="flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/2/22/Orange_logo.svg"
                      alt="Orange Money"
                      className="w-6 h-6"
                    />
                    Orange Money
                  </span>
                </label>

                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    type="radio"
                    name="payment-method"
                    className="radio checked:bg-primary"
                    checked={paymentMethod === "MTN_MOBILE_MONEY"}
                    onChange={() => setPaymentMethod("MTN_MOBILE_MONEY")}
                  />
                  <span className="flex items-center gap-2">
                    <img
                      src="https://upload.wikimedia.org/wikipedia/commons/3/33/MTN_Logo.svg"
                      alt="MTN Mobile Money"
                      className="w-6 h-6"
                    />
                    MTN Mobile Money
                  </span>
                </label>
              </div>
            </div>

            <div className="card bg-base-200 p-6 shadow-md">
              <h3 className="text-sm text-gray-500 mb-2">Montant à payer</h3>
              <h1 className="text-4xl font-bold mb-4">{plan.price} FCFA</h1>

              <div className="flex items-center gap-2 text-success mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Paiement & Facture
              </div>

              <p className="text-gray-600 mb-6">
                Nous nous occupons de toute la gestion de votre paiement. Vous pouvez vous concentrer sur votre boutique Buyticle.
              </p>

              <div className="card bg-base-100 p-4 shadow-sm flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-yellow-400 rounded-full p-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-5 h-5 text-white"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M13 16h-1v-4h-1m1-4h.01M12 2a10 10 0 11-7.744 16.32l-3.658 1.077 1.077-3.658A10 10 0 0112 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold">{plan.title}</h4>
                    <p className="text-xs text-gray-500">{plan.description}</p>
                  </div>
                </div>
                <button onClick={() => navigate("/pricing")} className="btn btn-sm btn-neutral">
                  Modifier
                </button>
              </div>
            </div>
          </div>

          {/* Partie Droite */}
          <div className="card bg-base-200 p-6 shadow-md space-y-6">
            <h2 className="text-2xl font-bold">Paiement</h2>
            <p className="text-sm text-gray-500">
              Pour finaliser votre inscription sur Buyticle, merci de compléter les informations ci-dessous.
            </p>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Numéro Mobile Money</span>
              </label>
              <input
                type="text"
                placeholder="+237 690 *** *00"
                className="input input-bordered"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text">Nom associé au compte Mobile Money</span>
              </label>
              <input
                type="text"
                placeholder="Votre Nom"
                className="input input-bordered"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Code promo (optionnel)"
                className="input input-bordered w-full"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
              />
              <button className="btn btn-neutral" onClick={() => alert("Code promo appliqué (simulation)")}>
                Appliquer
              </button>
            </div>

            <div className="collapse collapse-arrow bg-base-100 border border-base-300">
              <input type="checkbox" />
              <div className="collapse-title text-lg font-medium">Informations sur votre boutique</div>
              <div className="collapse-content space-y-4">
                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom du Vendeur</span>
                  </label>
                  <input type="text" placeholder="Jean Boutique" className="input input-bordered" />
                </div>

                <div className="form-control">
                  <label className="label">
                    <span className="label-text">Nom de la Boutique</span>
                  </label>
                  <input type="text" placeholder="Boutique Unique" className="input input-bordered" />
                </div>
              </div>
            </div>

            <button
              onClick={payment}
              disabled={loading}
              className={`btn bg-green-900 text-white hover:bg-green-700  w-full mt-4 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Chargement..." : "Payer Maintenant"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
