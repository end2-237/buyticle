import React, { createContext, useContext, useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { fetchShopByUserId } from "../services/shopService";
import { fetchProductsByIds } from "../services/productService"; // ta fonction existante

const ShopContext = createContext(null);

export function ShopProvider({ children }) {
  const [user, setUser] = useState(null);
  const [shop, setShop] = useState(null);
  const [products, setProducts] = useState([]);   // <-- nouveau state produits
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const auth = getAuth();

    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setLoading(true);

      if (!currentUser) {
        setUser(null);
        setShop(null);
        setProducts([]);       // vider aussi les produits
        setLoading(false);
        return;
      }

      setUser(currentUser);

      try {
        const shopData = await fetchShopByUserId(currentUser.uid);
        setShop(shopData);

        // Si on a une liste d'IDs produits dans la boutique, on récupère les produits
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

  return (
    <ShopContext.Provider value={{ user, shop, products, setShop, loading, error }}>
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
