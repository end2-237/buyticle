import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { _isActiveStore, fetchShopByUserId } from "../services/shopService";
import {
  fetchProductsByIds,
  addProductAndUpdateShop,
} from "../services/productService";

import { incrementProductCountForBrand } from "../services/brandService";
import { linkProductToCategory } from "../services/categoryService";

import { fetchOrdersForSeller } from "../services/orderService";

const ShopContext = createContext(null);

async function fetchUserData(uid) {
  try {
    const docRef = doc(db, "Users", uid); // L'ID du document est égal à l'UID
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      console.warn("Aucun document utilisateur trouvé");
      return null;
    }
  } catch (err) {
    console.error("Erreur lors de la récupération de l'utilisateur :", err);
    return null;
  }
}

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState(null);
  const [shop, setShop] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isActive, setIsActive] = useState(null);

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

      const userInfo = await fetchUserData(currentUser.uid);
      console.log(
        "Données Firestore récupérées pour l'utilisateur :",
        userInfo
      );
      setUserData(userInfo);

      try {
        const shopData = await fetchShopByUserId(currentUser.uid);
        setShop(shopData);

        if (shopData) {
          const subscription = await _isActiveStore(shopData);
          setIsActive(subscription);
        } else {
          setIsActive(false); // Par défaut, on considère qu'il n'a pas d'abonnement actif
        }

        //  récupèration de l'ID Firestore via  la fonction getShopId
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

  const activateShop = async (plan) => {
    if (!shopId) return;

    try {
      const shopRef = doc(db, "Store", shopId);
      await updateDoc(shopRef, {
        "Subscription.IsActived": true,
        "Subscription.Plan": plan?.title,
        "Subscription.Price": plan?.price,
        "Subscription.DateActivated": new Date(),
      });

      setIsActive(true);
      setShop((prev) => ({
        ...prev,
        Subscription: {
          ...(prev.Subscription || {}),
          IsActived: true,
          DateActivated: new Date(),
        },
      }));
    } catch (err) {
      console.error("Erreur lors de l'activation de la boutique :", err);
    }
  };

  useEffect(() => {
    if (!shopId) return;

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
        setProducts,
        setShop,
        isActive,
        setIsActive,
        orders,
        loading,
        error,
        addProduct,
        getShopId,
        setLoading,
        activateShop,
        userData,

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
