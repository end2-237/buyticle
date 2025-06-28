import {
  collection,
  addDoc,
  serverTimestamp,
  doc,
  updateDoc,
  arrayUnion,
  getDocs,
  query,
  where,
  arrayRemove,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase";

/**
 * Ajoute un produit dans Firestore avec la structure demandée.
 * @param {Object} product - Objet produit à enregistrer.
 * @returns {Promise<string>} - ID du document ajouté.
 */
export const addProductToFirestore = async (product) => {
  if (!product.Title || !product.Price) {
    throw new Error("Le titre et le prix du produit sont obligatoires.");
  }

  const newProduct = {
    Title: product.Title,
    Description: product.Description,
    CategoryId: product.CategoryId,
    IdSeller: product.IdSeller,
    IsFeatured: product.IsFeatured ?? true,
    Price: Number(product.Price),
    SalePrice: Number(product.SalePrice) || 0,
    Stock: Number(product.Stock) || 0,
    SKU: product.SKU || "",
    ProductType: product.ProductType || "ProductType.variable",

    Brand: {
      Id: product.Brand?.Id || "",
      Name: product.Brand?.Name || "",
      Image: product.Brand?.Image || "",
      IsFeatured: product.Brand?.IsFeatured ?? true,
      ProductsCount: Number(product.Brand?.ProductsCount) || 0,
    },

    Images: product.Images || [],
    Thumbnail: product.Thumbnail || (product.Images?.[0] ?? ""),

    ProductAttributes: product.ProductAttributes || [],

    ProductVariations: (product.ProductVariations || []).map((v) => ({
      Id: v.Id,
      AttributeValues: v.AttributeValues,
      Description: v.Description,
      Image: v.Image,
      Price: Number(v.Price),
      SalePrice: Number(v.SalePrice) || 0,
      Stock: Number(v.Stock) || 0,
      SKU: v.SKU || "",
    })),

    CreatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, "Products"), newProduct);
  return docRef.id;
};

/**
 * Ajoute un produit et met à jour la boutique pour inclure l'ID du produit.
 * @param {Object} product - Objet produit à enregistrer.
 * @param {string} shopId - ID de la boutique à mettre à jour.
 * @returns {Promise<string>} - ID du produit ajouté.
 */
export const addProductAndUpdateShop = async (product, shopId) => {
  if (!shopId)
    throw new Error("shopId est requis pour mettre à jour la boutique");

  // Ajouter le produit et récupérer son ID
  const productId = await addProductToFirestore(product);

  // Mettre à jour la boutique pour ajouter l'ID produit dans Products
  const shopRef = doc(db, "Store", shopId);
  try {
    await updateDoc(shopRef, {
      Products: arrayUnion(productId),
    });
  } catch (e) {
    console.error("Erreur update boutique Products:", e);
    throw e;
  }

  return productId;
};

/**
 * Récupère les produits correspondant aux IDs donnés.
 * @param {string[]} Products - Liste d'IDs produits.
 * @returns {Promise<Array>} - Liste des produits.
 */
export const fetchProductsByIds = async (Products) => {
  if (!Products.length) return [];

  const productsRef = collection(db, "Products");
  const allProducts = [];

  // Découpe en lots de 10
  const chunkSize = 10;
  for (let i = 0; i < Products.length; i += chunkSize) {
    const chunk = Products.slice(i, i + chunkSize);

    const q = query(productsRef, where("__name__", "in", chunk));
    const querySnapshot = await getDocs(q);

    querySnapshot.forEach((doc) => {
      allProducts.push({ id: doc.id, ...doc.data() });
    });
  }

  return allProducts;
};

//supprimer un produit de la collection firestore

/**
 * Supprime un produit de Firestore et le retire de la boutique.
 * @param {string} productId - ID du produit à supprimer.
 * @param {string} shopId - ID de la boutique à mettre à jour.
 */
export const deleteProductAndUpdateShop = async (productId, shopId) => {
  if (!productId || !shopId) {
    throw new Error("productId et shopId sont requis.");
  }

  const productRef = doc(db, "Products", productId);
  const shopRef = doc(db, "Store", shopId);

  try {
    // 1. Supprimer le produit de la collection Products
    await deleteDoc(productRef);

    // 2. Mettre à jour la boutique pour retirer l'ID du produit
    await updateDoc(shopRef, {
      Products: arrayRemove(productId),
    });

    console.log(`Produit ${productId} supprimé avec succès.`);
  } catch (error) {
    console.error("Erreur suppression produit :", error);
    throw error;
  }
};
