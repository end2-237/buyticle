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






// === PAWAPAY PAYMENT ===

// === PAWAPAY PAYMENT ===
exports.pawapayPay = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { amount, phone_number, userId, return_url } = req.body;

      if (!amount || isNaN(amount) || amount <= 0) {
        return res.status(400).json({ error: "Le montant doit être un nombre positif" });
      }
      if (!phone_number) return res.status(400).json({ error: "phone_number est requis" });
      if (!userId) return res.status(400).json({ error: "userId est requis" });
      if (!return_url) return res.status(400).json({ error: "return_url est requis" });

      const depositId = `PAWA_${Date.now()}`;
      console.log("👉 Nouvelle transaction PawaPay:", depositId);

      const axios = require("axios");
      const response = await axios.post(
        "https://sandbox-api.pawapay.io/v2/deposits",
        {
          depositId,
          payer: {
            type: "MMO",
            accountDetails: {
              phoneNumber: phone_number,
              provider: "ORANGE_CM" // à adapter selon le pays / opérateur
            }
          },
          clientReferenceId: `INV-${Date.now()}`,
          customerMessage: "Paiement service", // message générique
          amount: amount.toString(),
          currency: "XAF",
          metadata: [
            {
              orderId: `ORD-${Date.now()}`
            },
            {
              customerId: userId,
              isPII: true
            }
          ]
        },
        {
          headers: {
            Authorization: `Bearer eyJraWQiOiIxIiwiYWxnIjoiRVMyNTYifQ.eyJ0dCI6IkFBVCIsInN1YiI6IjcxMDIiLCJtYXYiOiIxIiwiZXhwIjoyMDc0NDY5NTU1LCJpYXQiOjE3NTg5MzY3NTUsInBtIjoiREFGLFBBRiIsImp0aSI6ImY5MmExNWFmLWQxNjMtNDFhNS1hZjEyLWVkMWE0ZGI1NDI0NSJ9.VyaNFaRtFDEl9dRLYyHhPXEj2myr3jUr6r1jhngveGdwmyWA4bq6M5F9-jb3fG2IkmUyxLaVBFvYUgT69wLPqQ`,
            "Content-Type": "application/json"
          }
        }
      );

      const { depositId: returnedId, status } = response.data;

      // Sauvegarde en Firestore
      await db.collection("Transactions").doc(depositId).set({
        userId,
        amount,
        status,
        type: "payment",
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
        phone: phone_number
      });

      return res.status(200).json({
        success: true,
        transactionId: returnedId,
        status,
        data: response.data
      });
    } catch (error) {
      console.error("❌ Erreur paiement PawaPay:", error.response?.data || error.message);
      return res.status(500).json({ success: false, error: error.message || "Erreur serveur" });
    }
  });
});


// === WEBHOOK PAWAPAY ===

// === PAWAPAY CALLBACKS ===
exports.pawapayDepositCallback = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      console.log("📩 PawaPay Deposit Callback:", req.body);

      const { transactionId, status, amount, currency, msisdn } = req.body;

      if (!transactionId) {
        return res.status(400).send("transactionId manquant");
      }

      // Exemple : mise à jour transaction en base
      const txnRef = db.collection("Transactions").doc(transactionId);
      await txnRef.set(
        {
          type: "deposit",
          status,
          amount,
          currency,
          phone: msisdn,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      res.status(200).send("Deposit callback OK");
    } catch (error) {
      console.error("❌ Erreur depositCallback:", error);
      res.status(500).send("Erreur serveur");
    }
  });
});

exports.pawapayPaymentCallback = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      console.log("📩 PawaPay Payment Callback:", req.body);

      const { transactionId, status, amount, currency, msisdn } = req.body;

      if (!transactionId) {
        return res.status(400).send("transactionId manquant");
      }

      const txnRef = db.collection("Transactions").doc(transactionId);
      await txnRef.set(
        {
          type: "payment",
          status,
          amount,
          currency,
          phone: msisdn,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      res.status(200).send("Payment callback OK");
    } catch (error) {
      console.error("❌ Erreur paymentCallback:", error);
      res.status(500).send("Erreur serveur");
    }
  });
});

exports.pawapayRefundCallback = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      console.log("📩 PawaPay Refund Callback:", req.body);

      const { transactionId, status, amount, currency } = req.body;

      if (!transactionId) {
        return res.status(400).send("transactionId manquant");
      }

      const txnRef = db.collection("Transactions").doc(transactionId);
      await txnRef.set(
        {
          type: "refund",
          status,
          amount,
          currency,
          updatedAt: new Date(),
        },
        { merge: true }
      );

      res.status(200).send("Refund callback OK");
    } catch (error) {
      console.error("❌ Erreur refundCallback:", error);
      res.status(500).send("Erreur serveur");
    }
  });
});



/* ──────────────────────────────────────────────────────────
   Push FCM (Gen 1) : envoie une notification aux appareils des
   testeurs dès qu'un document est créé dans "notifications".
   audience = uid d'un testeur | "all" = diffusion à tous.
   ────────────────────────────────────────────────────────── */
exports.sendNotification = functions.firestore
  .document("notifications/{id}")
  .onCreate(async (snap) => {
    const n = snap.data();
    if (!n) return null;

    // 1. Rassembler les tokens FCM cibles
    let tokens = [];
    if (n.audience === "all") {
      const all = await db.collection("testers").get();
      all.forEach((d) => {
        const arr = d.data().fcmTokens;
        if (Array.isArray(arr)) tokens.push(...arr);
      });
    } else if (n.audience) {
      const d = await db.collection("testers").doc(n.audience).get();
      const arr = d.exists ? d.data().fcmTokens : null;
      if (Array.isArray(arr)) tokens = arr.slice();
    }
    tokens = [...new Set(tokens)].filter(Boolean);
    if (!tokens.length) return null;

    // 2. Envoyer
    const message = {
      notification: { title: n.title || "Buyticle", body: n.body || "" },
      webpush: {
        notification: { icon: "https://buyticle.com/logo-buyticle.png" },
        fcmOptions: { link: "https://buyticle.com/testers/dashboard" },
      },
      data: { type: String(n.type || "info"), tag: snap.id },
      tokens,
    };

    try {
      const resp = await admin.messaging().sendEachForMulticast(message);
      // 3. Nettoyer les tokens invalides
      const invalid = [];
      resp.responses.forEach((r, i) => {
        if (!r.success) {
          const code = (r.error && r.error.code) || "";
          if (code.includes("registration-token-not-registered") || code.includes("invalid-argument")) {
            invalid.push(tokens[i]);
          }
        }
      });
      for (const tok of invalid) {
        const q = await db.collection("testers").where("fcmTokens", "array-contains", tok).get();
        await Promise.all(q.docs.map((d) => d.ref.update({ fcmTokens: admin.firestore.FieldValue.arrayRemove(tok) })));
      }
      console.log(`FCM: ${resp.successCount}/${tokens.length} envoyes (${invalid.length} nettoyes)`);
    } catch (e) {
      console.error("Erreur envoi FCM:", e);
    }
    return null;
  });
