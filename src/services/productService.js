import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { getDocs, query, where } from "firebase/firestore";

import { db } from '../firebase';

/**
 * Ajoute un produit dans Firestore avec la structure exacte demandée.
 * @param {Object} product - Objet produit à enregistrer.
 * @returns {Promise<string>} - ID du document ajouté.
 */
export const addProductToFirestore = async (product) => {
  if (!product.Title || !product.Price) {
    throw new Error('Le titre et le prix du produit sont obligatoires.');
  }

  // Construire l'objet final conforme au modèle
  const newProduct = {
    Title: product.Title,
    Description: product.Description,
    CategoryId: product.CategoryId,
    IdSeller: product.IdSeller,
    IsFeatured: product.IsFeatured ?? true,
    Price: Number(product.Price),
    SalePrice: Number(product.SalePrice) || 0,
    Stock: Number(product.Stock) || 0,
    SKU: product.SKU || '',
    ProductType: product.ProductType || 'ProductType.variable',

    Brand: {
      Id: product.Brand.Id || '',
      Name: product.Brand.Name || '',
      Image: product.Brand.Image || '',
      IsFeatured: product.Brand.IsFeatured ?? true,
      ProductsCount: Number(product.Brand.ProductsCount) || 0,
    },

    Images: product.Images || [],
    Thumbnail: product.Thumbnail || (product.Images?.[0] ?? ''),

    ProductAttributes: product.ProductAttributes || [],

    ProductVariations: product.ProductVariations.map((v) => ({
      Id: v.Id,
      AttributeValues: v.AttributeValues,
      Description: v.Description,
      Image: v.Image,
      Price: Number(v.Price),
      SalePrice: Number(v.SalePrice) || 0,
      Stock: Number(v.Stock) || 0,
      SKU: v.SKU || '',
    })),

    CreatedAt: serverTimestamp(),
  };

  const docRef = await addDoc(collection(db, 'Products'), newProduct);
  return docRef.id;
};


export const fetchProductsByIds = async (Products) => {
  if (!Products.length) return [];

  const productsRef = collection(db, 'Products');

  // Firestore permet where('id', 'in', [...]) max 10 IDs
  // On prend donc juste max 10
  const limitedIds = Products.slice(0, 10);

  const q = query(productsRef, where('__name__', 'in', limitedIds));
  const querySnapshot = await getDocs(q);

  const products = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() });
  });

  return products;
};