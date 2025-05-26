import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, query, where, getDocs, doc } from "firebase/firestore";
import { db } from "../firebase"; // adapte selon ton projet
import { fetchShopByUserId } from "../services/shopService"; // ta fonction existante pour récupérer boutique
import { fetchProductsByIds, addProductAndUpdateShop } from "../services/productService";

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [shopId, setShopId] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        console.log("Test:",id)
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
        console.log("Store: ",querySnapshot.docs[0].id)
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

      setLoading(false);
      return newProductId;
    } catch (err) {
      setError(err);
      setLoading(false);
      throw err;
    }
  };

  return (
    <ShopContext.Provider
      value={{
        user,
        shop,
        shopId,
        products,
        setShop,
        loading,
        error,
        addProduct,
        getShopId,
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
