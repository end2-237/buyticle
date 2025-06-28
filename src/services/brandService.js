import { getDocs, getDoc, collection, doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchBrands = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Brands"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Erreur récupération marques :", error);
      return [];
    }
  };

  export const incrementProductCountForBrand = async (brandId) => {
    try {
      const brandRef = doc(db, "Brands", brandId);
      const brandSnap = await getDoc(brandRef);
      if (brandSnap.exists()) {
        const currentCount = brandSnap.data().ProductsCount || 0;
        await updateDoc(brandRef, {
          ProductsCount: currentCount + 1,
        });
      }
    } catch (error) {
      console.error("Erreur incrémentation marque :", error);
    }
  };
  