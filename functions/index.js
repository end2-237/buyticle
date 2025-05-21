const functions = require("firebase-functions");
const axios = require("axios");

// Fonction de paiement pawaPay en sandbox
exports.initiatePawaPay = functions.https.onRequest(async (req, res) => {
  const apiKey = "eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjcxODkiLCJtYXYiOiIxIiwiZXhwIjoyMDYyNjI0NDQyLCJpYXQiOjE3NDcwOTE2NDIsInBtIjoiREFGLFBBRiIsImp0aSI6ImZiYmM2NjhlLTYxODAtNDVhYS05MmJiLWUxY2IzNWZiODczYSJ9.f1RatG3HP78KvpUrYFB9AZqZDfzRwmUIxVlRhDBDafrkHGHmfNfMydeStx3TxjTmAoP_n4LHeT4_jwy8Ma8eYw"; // Remplace par ton vrai token
  try {
    const response = await axios.post(
      "https://api.sandbox.pawapay.cloud/checkout",
      {
        reference: "test-transaction-001",
        amount: 1000, // ex: 1000 = 10.00
        currency: "XAF", // Change selon le pays de test (ex: GHS, UGX, XOF)
        sender: {
          phone: "+237696995879",
          network: "ORNGE" // ou MTN, AIRTEL, etc.
        },
        recipient: {
          business: "TON_SHORTCODE" // récupéré depuis le dashboard sandbox
        }
      },
      {
        headers: {
          Authorization: `Bearer ${apiKey}`,
          "Content-Type": "application/json"
        }
      }
    );

    res.status(200).send(response.data);
  } catch (err) {
    console.error("Erreur pawaPay:", err.response?.data || err.message);
    res.status(500).send(err.response?.data || "Erreur interne");
  }
});
