const functions = require("firebase-functions");
const admin = require("firebase-admin");
const cors = require("cors")({ origin: true });
const { PayunitClient } = require("@payunit/nodejs-sdk");

if (!admin.apps.length) {
  admin.initializeApp();
}
const db = admin.firestore();

const client = new PayunitClient({
  baseURL: "https://gateway.payunit.net",
  apiKey: "live_lQNXNk8DNAcZpuYduL49yxOccIwBEY0Sn0SMZhDB",
  apiUsername: "2102aa79-f893-4f38-ac77-22524a648422",
  apiPassword: "650fd5a9-57a8-4abb-ad1c-e2059cb76520",
  mode: "live",
  timeout: 15000, // ⏱️ réduit pour éviter le blocage
});

exports.payWithMobileMoney = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { amount, phone_number, paymentMethod, userId, plan } = req.body;

      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Le montant doit être un nombre positif" });
      }
      if (!phone_number) return res.status(400).json({ error: "phone_number est requis" });
      if (!userId || !plan) return res.status(400).json({ error: "userId et plan sont requis" });

      const localTransactionId = `TXN_${Date.now()}`;
      console.log("👉 Nouvelle transaction:", localTransactionId);

      // 1. Création du Payment Request
      let paymentRequest;
      try {
        paymentRequest = await client.collections.initiatePayment({
          total_amount: parseInt(amount),
          currency: "XAF",
          transaction_id: localTransactionId,
          return_url: "https://buyticle.com/payment-success",
          notify_url: "https://us-central1-buyticle-bce3f.cloudfunctions.net/payunitWebhook",
          payment_country: "CM",
          pay_with: paymentMethod,
        });
      } catch (err) {
        console.error("❌ Erreur initiatePayment:", err.response?.data || err.message);
        return res.status(502).json({ error: "Impossible de créer la requête de paiement" });
      }

      const payunitId = paymentRequest?.transaction_id || localTransactionId;
      console.log("✅ Transaction PayUnit ID:", payunitId);

      // 2. Lancer paiement Mobile Money
      let paymentResult;
      try {
        paymentResult = await client.collections.makePayment({
          amount: parseInt(amount),
          gateway: paymentMethod,
          currency: "XAF",
          transaction_id: payunitId,
          phone_number,
          return_url: "https://buyticle.com/payment-success",
          notify_url: "https://us-central1-buyticle-bce3f.cloudfunctions.net/payunitWebhook",
        });
      } catch (err) {
        console.error("❌ Erreur makePayment:", err.response?.data || err.message);
        return res.status(502).json({ error: "Le paiement n’a pas pu être lancé" });
      }

      // 3. Sauvegarde en base
      await db.collection("Transactions").doc(payunitId).set({
        userId,
        plan,
        amount,
        status: "PENDING",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      return res.status(200).json({
        success: true,
        validTransactionId: payunitId,
        localTransactionId,
        data: paymentResult,
      });
    } catch (error) {
      console.error("Erreur paiement Mobile Money:", error);
      return res.status(500).json({ success: false, error: error.message || error.toString() });
    }
  });
});


// === WEBHOOK PAYUNIT ===
exports.payunitWebhook = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { transaction_id, status } = req.body;
      console.log("📩 Webhook PayUnit:", req.body);

      if (!transaction_id || !status) {
        return res.status(400).send("Paramètres manquants");
      }

      const txnRef = db.collection("Transactions").doc(transaction_id);
      const txnSnap = await txnRef.get();

      if (!txnSnap.exists) {
        return res.status(404).send("Transaction inconnue");
      }

      const txnData = txnSnap.data();

      if (status === "SUCCESS") {
        await db.collection("Store").doc(txnData.userId).update({
          "Subscription.IsActived": true,
          "Subscription.Plan": txnData.plan.title,
          "Subscription.Price": txnData.plan.price,
          "Subscription.DateActivated": new Date(),
        });

        await txnRef.update({ status: "SUCCESS", updatedAt: new Date() });
        console.log(`✅ Paiement validé pour user ${txnData.userId}`);
      } else {
        await txnRef.update({ status: status, updatedAt: new Date() });
        console.log(`❌ Paiement échoué (${status}) pour user ${txnData.userId}`);
      }

      res.status(200).send("OK");
    } catch (error) {
      console.error("Erreur webhook PayUnit:", error);
      res.status(500).send("Erreur serveur");
    }
  });
});
