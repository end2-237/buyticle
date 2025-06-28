import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase"; // adapte selon ton projet
import { fetchShopByUserId } from "../services/shopService"; // ta fonction existante pour récupérer boutique
import {
  fetchProductsByIds,
  addProductAndUpdateShop,
} from "../services/productService";

import { incrementProductCountForBrand } from "../services/brandService";
import { linkProductToCategory } from "../services/categoryService";

import { fetchOrdersForSeller } from "../services/orderService";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);
      setError(null);

      if (!currentUser) {
        setUser(null);
        setShop(null);
        setShopId(null);
        setProducts([]);
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const shopData = await fetchShopByUserId(currentUser.uid);
        setShop(shopData);

        // Ici on récupère l'ID Firestore via ta fonction getShopId
        const id = await getShopId(currentUser.uid);
        console.log("Test:", id);
        setShopId(id);

        if (shopData?.Products?.length) {
          const prods = await fetchProductsByIds(shopData.Products);
          setProducts(prods);
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  // Fonction pour récupérer uniquement l'ID de la boutique par userId
  async function getShopId(userId) {
    try {
      const shopsRef = collection(db, "Store"); // Référence collection
      const q = query(shopsRef, where("IdUser", "==", userId)); // filtre sur champ IdUser
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        console.log("Store: ", querySnapshot.docs[0].id);
        return querySnapshot.docs[0].id; // retourne l'id du doc Firestore
      }
      return null;
    } catch (err) {
      setError(err);
      return null;
    }
  }

  const addProduct = async (product) => {
    if (!shopId) {
      throw new Error("Aucune boutique chargée pour ajouter un produit");
    }

    setLoading(true);
    try {
      const newProductId = await addProductAndUpdateShop(product, shopId);

      const newProductList = await fetchProductsByIds([newProductId]);

      setProducts((prev) => [...prev, ...newProductList]);
      setShop((prev) => ({
        ...prev,
        Products: [...(prev.Products || []), newProductId],
      }));

      // Incrémenter le compteur de produits dans la marque et la catégorie si renseignés
      if (product.Brand?.Id) {
        await incrementProductCountForBrand(product.Brand.Id);
      }
      // Lier le produit à la catégorie
      if (product.CategoryId) {
        await linkProductToCategory(product.CategoryId, newProductId);
      }

      setLoading(false);
      return newProductId;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  // ...

  useEffect(() => {
    if (!shopId) return; // ne rien faire si shopId nul

    setLoading(true);
    // Fonction async interne pour charger les commandes
    async function fetchOrders() {
      setLoading(true);
      setError(null);
      try {
        const ordersFetched = await fetchOrdersForSeller(shopId);
        setOrders(ordersFetched);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    }

    fetchOrders();
  }, [shopId]);

  return (
    <ShopContext.Provider
      value={{
        user,
        shop,
        shopId,
        products,
        setProducts, // Ajouté ici
        setShop,
        orders,
        loading,
        error,
        addProduct,
        getShopId,
        setLoading, // Ajoute-le aussi si tu veux pouvoir le gérer depuis l'extérieur
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}
