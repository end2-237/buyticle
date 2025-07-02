// src/services/shopService.js
import { doc, getDoc } from "firebase/firestore";
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

