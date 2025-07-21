// src/services/shopService.js
import { doc, getDoc, updateDoc } from "firebase/firestore";

import { db } from "../firebase";

export async function fetchShopByUserId(userId) {
  try {
    const docRef = doc(db, "Store", userId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data();
    }
    return null;
  } catch (error) {
    console.error("Erreur lors de la récupération de la boutique :", error);
    throw error;
  }
}

export async function _isActiveStore(shop) {
  if (shop?.Subscription?.IsActived) {
    return true;
  }
  return false;
}


export const handleSaveLocation = async (userLocation, shop, shopId, address) => {
  if (!userLocation || !shop?.IdUser) {
    alert("Localisation ou boutique introuvable");
    return;
  }

  try {
    const shopRef = doc(db, "Store", shopId); 
    await updateDoc(shopRef, {
      Location: {
        lat: userLocation.lat,
        lng: userLocation.lng,
        address: address,
      },
    });

    alert("Localisation enregistrée !");
  } catch (err) {
    console.error("Erreur d'enregistrement de la position :", err);
    alert("Erreur lors de l'enregistrement de la position.");
  }
};


