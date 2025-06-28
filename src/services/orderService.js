import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchOrdersForSeller(sellerId) {
  const ordersList = [];

  try {
    // 1. Récupérer tous les produits du vendeur en 1 requête
    const productsSnapshot = await getDocs(
      collection(db, "Products")
    );
    const sellerProductIds = new Set();
    productsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.IdSeller === sellerId) {
        sellerProductIds.add(doc.id);
      }
    });

    if (sellerProductIds.size === 0) {
      console.log(`⚠️ Aucun produit trouvé pour seller ${sellerId}`);
      return [];
    }

    // 2. Récupérer tous les utilisateurs
    const usersSnapshot = await getDocs(collection(db, "Users"));
    console.log(`🔍 Found ${usersSnapshot.size} users`);

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const ordersRef = collection(userDoc.ref, "Orders");
      const ordersSnapshot = await getDocs(ordersRef);
      console.log(`👤 User ${userId} has ${ordersSnapshot.size} orders`);

      for (const orderDoc of ordersSnapshot.docs) {
        const orderData = orderDoc.data();
        const items = orderData.items || [];

        // Vérifier localement si un des produits est dans sellerProductIds
        const hasProductFromSeller = items.some(item =>
          sellerProductIds.has(item.productId)
        );

        if (hasProductFromSeller) {
          console.log(`✅ Commande ${orderDoc.id} contient un produit du vendeur ${sellerId}`);
          ordersList.push({
            ...orderData,
            orderId: orderDoc.id,
            userId,
          });
        }
      }
    }

    return ordersList;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des commandes vendeur :", err);
    throw err;
  }
}
