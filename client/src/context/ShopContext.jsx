import { createContext, useState, useEffect } from "react";
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
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [user, setUser] = useState(null);

  const fetchProducts = async (page = 1, category = "", searchTerm = "") => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: "12", // Show 12 products per page
      });
      if (category) params.append("category", category);
      if (searchTerm) params.append("search", searchTerm);

      const res = await fetch(`/api/products?${params}`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      setProducts(data.products || []);
      setTotalProducts(data.total || 0);
      setTotalPages(Math.ceil((data.total || 0) / 12));
      setCurrentPage(page);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
    const token = localStorage.getItem("token");
    if (token) {
      fetchCart();
    }
  }, []);

  // Cart actions
  const fetchCart = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    setCartLoading(true);
    setCartError(null);
    try {
      const res = await fetch("/api/cart", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        throw new Error("Failed to fetch cart");
      }
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
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        throw new Error("Failed to add to cart");
      }
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
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        throw new Error("Failed to remove from cart");
      }
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
      if (!res.ok) {
        if (res.status === 401) {
          localStorage.removeItem("token");
          window.location.href = "/login";
          return;
        }
        throw new Error("Failed to clear cart");
      }
      const data = await res.json();
      setCart(data);
    } catch (err) {
      setCartError(err.message);
    } finally {
      setCartLoading(false);
    }
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      fetchProducts(page);
    }
  };

  const nextPage = () => {
    if (currentPage < totalPages) {
      fetchProducts(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      fetchProducts(currentPage - 1);
    }
  };

  // Decode JWT token to get user info
  const getUserFromToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const userData = getUserFromToken(token);
      setUser(userData);
    }
  }, []);

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
    currentPage,
    totalPages,
    totalProducts,
    goToPage,
    nextPage,
    prevPage,
    fetchProducts,
    user,
  };
  return <ShopContext.Provider value={value}>{children}</ShopContext.Provider>;
};

export default ShopContextProvider;
