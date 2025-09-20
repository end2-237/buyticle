import Navigation from "../nav";
import { Ripples } from "ldrs/react";
import "ldrs/react/Ripples.css";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase"; // ton instance firestore
import { useShop } from "../contexts/shopContext";

export default function PayementEncours() {
  const navigate = useNavigate();
  const { shopId } = useShop();

  useEffect(() => {
    if (!shopId) return;

    const unsub = onSnapshot(doc(db, "Store", shopId), (docSnap) => {
      if (docSnap.exists() && docSnap.data().Subscription.IsActived) {
        navigate("/payment-success");
      }
    });

    return () => unsub();
  }, [navigate, shopId]);

  return (
    <div>
      <Navigation />
      <div className="flex justfy-center items-center flex-col gap-5">
        <div className="flex flex-col gap-2 justify-center items-center md:mt-14 mt-40">
          <h1 className="text-3xl font-bold">Paiement en cours</h1>
          <p>Veuillez patienter, nous validons votre transaction...</p>
        </div>

        <Ripples size="150" speed="2" color="orange" />

        <p className="text-center text-sm text-gray-600 animate-pulse">
          En cours de traitement...
        </p>
      </div>
    </div>
  );
}
