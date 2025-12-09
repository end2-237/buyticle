import { useEffect, useState } from "react";

export default function VerifyFacture() {
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawData = params.get("data");

    if (!rawData) {
      setError("Aucune donnée fournie.");
      return;
    }

    try {
      const decoded = decodeURIComponent(rawData);
      const json = JSON.parse(decoded);
      setInvoice(json);
    } catch (e) {
      setError("QR Code invalide ou corrompu.");
    }
  }, []);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-red-200 text-red-800 p-6 rounded-xl shadow-xl text-center">
          {error}
        </div>
      </div>
    );
  }

  if (!invoice) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        Chargement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white w-full max-w-lg p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-green-600 text-center">
          ✓ Facture Authentique
        </h1>

        <div className="mt-6 space-y-3 text-gray-700">
          <p><strong>Type :</strong> {invoice.type}</p>
          <p><strong>Numéro :</strong> {invoice.number}</p>
          <p><strong>Date :</strong> {invoice.date}</p>
          <p><strong>Client :</strong> {invoice.client}</p>
          <p><strong>Total TTC :</strong> {invoice.total.toFixed(2)} XAF</p>
        </div>

        <p className="mt-8 text-center text-sm text-gray-500">
          Vérifié sur buyticle.com — ce document est authentique.
        </p>
      </div>
    </div>
  );
}