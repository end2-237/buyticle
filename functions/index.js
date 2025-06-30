const functions = require('firebase-functions');
const cors = require('cors')({ origin: true });  // Autorise toutes origines (à restreindre en prod)
const { PayunitClient } = require('@payunit/nodejs-sdk');

const client = new PayunitClient({
  baseURL: 'https://gateway.payunit.net',
  apiKey: 'sand_3ec58uPDQGkCjqsIJFnZQtJG9JVgf7',
  apiUsername: '2102aa79-f893-4f38-ac77-22524a648422',
  apiPassword: '650fd5a9-57a8-4abb-ad1c-e2059cb76520',
  mode: 'test',
  timeout: 10000,
});

exports.payWithMobileMoney = functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    try {
      const { amount, phone_number } = req.body;

      if (!amount || !phone_number) {
        return res.status(400).json({ error: 'amount et phone_number sont requis' });
      }

      const transactionId = `TXN_${Date.now()}`;

      // 1. Création du Payment Request
      const paymentRequest = await client.collections.initiatePayment({
        total_amount: amount,
        currency: 'XAF',
        transaction_id: transactionId,
        return_url: 'https://buyticle.com',
        notify_url: 'https://buyticle.com',
        payment_country: 'CM',
        pay_with: 'CM_ORANGE',
      });

      // 2. Vérification du transaction_id
      const validTransactionId = paymentRequest?.transaction_id || transactionId;

      // 3. Paiement Mobile Money
      const paymentResult = await client.collections.makePayment({
        amount: amount,
        gateway: 'CM_ORANGE',
        currency: 'XAF',
        transaction_id: validTransactionId,
        phone_number: phone_number,
        return_url: 'https://buyticle.com',
        notify_url: 'https://buyticle.com',
      });

      return res.status(200).json({ success: true, data: paymentResult });

    } catch (error) {
      console.error('Erreur paiement Mobile Money:', error);
      return res.status(500).json({ success: false, error: error.message || error.toString() });
    }
  });
});
