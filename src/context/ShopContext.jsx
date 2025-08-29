import { createContext, useState, useEffect } from "react";
// import { products } from "../assets/assets";
export const ShopContext = createContext();

const ShopContextProvider = ({ children }) => {
  // const currency = "$";
  const deliveryFee = 10;
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(false);
  const [cartError, setCartError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/products");
        if (!res.ok) throw new Error("Failed to fetch products");
        const data = await res.json();
        setProducts(data.products || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Cart actions
  const fetchCart = async () => {
    setCartLoading(true);
    setCartError(null);
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to fetch cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const addToCart = async (productId, quantity = 1) => {
    setCartLoading(true);
    setCartError(null);
    try {
      const res = await fetch("/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId, quantity }),
      });
      if (!res.ok) throw new Error("Failed to add to cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const removeFromCart = async (productId) => {
    setCartLoading(true);
    setCartError(null);
    try {
      const res = await fetch("/api/cart/remove", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ productId }),
      });
      if (!res.ok) throw new Error("Failed to remove from cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const clearCart = async () => {
    setCartLoading(true);
    setCartError(null);
    try {
      const res = await fetch("/api/cart/clear", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (!res.ok) throw new Error("Failed to clear cart");
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const value = {
    products,
    loading,
    error,
    // currency,
    deliveryFee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cart,
    cartLoading,
    cartError,
    fetchCart,
    addToCart,
    removeFromCart,
    clearCart,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
