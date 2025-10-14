import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";

export async function fetchOrdersForSeller(sellerId) {
  const ordersList = [];

  try {
    // 1️⃣ Récupérer tous les produits appartenant à ce vendeur
    const productsSnapshot = await getDocs(collection(db, "Products"));
    const sellerProductIds = new Set();

    productsSnapshot.forEach((doc) => {
      const data = doc.data();
      if (data?.IdSeller === sellerId) {
        sellerProductIds.add(doc.id);
      }
    });

    if (sellerProductIds.size === 0) {
      console.log(`⚠️ Aucun produit trouvé pour le vendeur ${sellerId}`);
      return [];
    }

    // 2️⃣ Parcourir tous les utilisateurs
    const usersSnapshot = await getDocs(collection(db, "Users"));

    for (const userDoc of usersSnapshot.docs) {
      const userId = userDoc.id;
      const ordersRef = collection(userDoc.ref, "Orders");
      const ordersSnapshot = await getDocs(ordersRef);

      // 3️⃣ Parcourir les commandes de chaque utilisateur
      for (const orderDoc of ordersSnapshot.docs) {
        const orderData = orderDoc.data();
        const items = Array.isArray(orderData.items) ? orderData.items : [];

        // 4️⃣ Ne garder que les items du vendeur
        const sellerItems = items.filter((item) =>
          sellerProductIds.has(item.productId)
        );

        // 5️⃣ Si cette commande contient des produits du vendeur, on la garde
        if (sellerItems.length > 0) {
          // Calculer le total spécifique à ce vendeur
          const totalForSeller = sellerItems.reduce(
            (acc, item) => acc + (item.price || 0) * (item.quantity || 1),
            0
          );

          ordersList.push({
            id: orderDoc.id,
            userId,
            orderDate: orderData.orderDate || null,
            status: orderData.status || "OrderStatus.pending",
            totalAmount: totalForSeller,
            items: sellerItems.map((item) => ({
              title: item.title || "Produit sans nom",
              image: item.image || "",
              price: item.price || 0,
              quantity: item.quantity || 1,
              attributes: item.attributes || {},
              productId: item.productId,
            })),
          });
        }
      }
    }

    console.log("✅ Commandes filtrées du vendeur :", ordersList);
    return ordersList;
  } catch (err) {
    console.error("❌ Erreur lors de la récupération des commandes vendeur :", err);
    throw err;
  }
}
