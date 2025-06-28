import { getDocs, collection, addDoc } from "firebase/firestore";
import { db } from "../firebase";

export const fetchCategories = async () => {
    try {
      const snapshot = await getDocs(collection(db, "Categories"));
      return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
      console.error("Erreur récupération catégories :", error);
      return [];
    }
  };
  

  export const linkProductToCategory = async (categoryId, productId) => {
    try {
      await addDoc(collection(db, "ProductCategory"), {
        categoryId: String(categoryId),
        productId: String(productId),
      });
      console.log(`Produit ${productId} lié à la catégorie ${categoryId}`);
    } catch (error) {
      console.error("Erreur lors du lien produit-catégorie :", error);
    }
  };
