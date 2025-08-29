import React, { useState, useContext, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const PlaceOrder = () => {
  const { cart, fetchCart, cartLoading } = useContext(ShopContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);
  const [cartFetched, setCartFetched] = useState(false);

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    // Ensure cart is loaded when component mounts - only once
    if (!cartFetched && fetchCart) {
      setCartFetched(true);
      fetchCart();
    }
  }, []); // Empty dependency array to prevent loops

  useEffect(() => {
    // Check cart after it's loaded - only navigate if cart is definitively empty
    // Add a small delay to prevent rapid navigation loops
    const timer = setTimeout(() => {
      if (
        cart !== null &&
        cart !== undefined &&
        (!cart.items || cart.items.length === 0)
      ) {
        navigate("/cart");
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [cart, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Debug: Show cart state
    console.log("=== CART DEBUG BEFORE ORDER ===");
    console.log("Cart from context:", cart);
    console.log("Cart items:", cart?.items);
    console.log("Cart items type:", typeof cart?.items);
    console.log("Cart items length:", cart?.items?.length);

    // Validate shipping address
    const requiredFields = ["street", "city", "state", "zipCode", "country"];
    const missingFields = requiredFields.filter(
      (field) => !shippingAddress[field].trim()
    );

    if (missingFields.length > 0) {
      setError(
        `Please fill in all required fields: ${missingFields.join(", ")}`
      );
      setLoading(false);
      return;
    }

    try {
      console.log("=== ORDER PLACEMENT DEBUG ===");
      console.log("Cart at order time:", cart);
      console.log("Cart items:", cart?.items);
      console.log("Cart items length:", cart?.items?.length);

      // Ensure cart items have proper product IDs
      if (!cart) {
        throw new Error("Cart is not loaded - please refresh the page");
      }
      if (!cart.items) {
        throw new Error("Cart has no items property - cart may be corrupted");
      }
      if (!Array.isArray(cart.items)) {
        throw new Error("Cart items is not an array - cart may be corrupted");
      }
      if (cart.items.length === 0) {
        throw new Error("Cart is empty - please add items before checkout");
      }

      // Additional validation
      for (let i = 0; i < cart.items.length; i++) {
        const item = cart.items[i];
        if (!item.product) {
          throw new Error(`Cart item ${i} has no product data`);
        }
        if (!item.quantity || item.quantity <= 0) {
          throw new Error(
            `Cart item ${i} has invalid quantity: ${item.quantity}`
          );
        }
      }

      const orderItems = cart.items.map((item, index) => {
        console.log(`Processing cart item ${index}:`, item);
        console.log("Item product:", item.product);
        console.log("Item product._id:", item.product?._id);
        console.log("Item product (direct):", item.product);

        const productId = item.product?._id || item.product;
        console.log("Resolved productId:", productId);

        if (!productId) {
          throw new Error(
            `Invalid product in cart item ${index}: ${JSON.stringify(item)}`
          );
        }
        return {
          product: productId,
          quantity: item.quantity,
        };
      });

      console.log("Final order items created:", orderItems);

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
      };

      console.log("Sending order data:", orderData); // Debug log

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        console.error("Order error response:", errorData); // Debug log
        throw new Error(
          errorData.message || `Failed to place order (${res.status})`
        );
      }

      let data;
      try {
        const responseText = await res.text();
        console.log("=== RAW RESPONSE DEBUG ===");
        console.log("Raw response text:", responseText);
        console.log("Response text length:", responseText.length);
        console.log("Response status:", res.status);
        console.log(
          "Response headers:",
          Object.fromEntries(res.headers.entries())
        );

        if (!responseText || responseText.trim() === "") {
          console.error("Empty response from server");
          throw new Error("Server returned empty response");
        }

        data = JSON.parse(responseText);
        console.log("=== PARSED RESPONSE DEBUG ===");
        console.log("Parsed response:", data);
        console.log("Order object:", data.order);
        console.log("Order _id:", data.order?._id);
      } catch (parseError) {
        console.error("JSON parse error:", parseError);
        console.error("Response status:", res.status);
        throw new Error(`Server returned invalid JSON: ${parseError.message}`);
      }

      if (!data.order) {
        console.error("No order object in response data:", data);
        throw new Error("Order created but no order data returned");
      }

      if (!data.order._id) {
        console.error("Order object exists but no _id:", data.order);
        throw new Error("Order created but missing order ID");
      }

      console.log("Order ID found:", data.order._id);
      setOrderId(data.order._id);
      setOrderPlaced(true);

      // Refresh cart
      await fetchCart();
    } catch (err) {
      console.error("Order placement error:", err); // Debug log
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (orderPlaced) {
    return (
      <div className="pt-20 px-4 max-w-2xl mx-auto text-center">
        <div className="bg-green-50 border border-green-200 rounded-lg p-8">
          <div className="text-6xl mb-4">✅</div>
          <h1 className="text-3xl font-bold text-green-800 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-gray-600 mb-4">
            Thank you for your order. Your order ID is:{" "}
            <strong>{orderId}</strong>
          </p>
          <p className="text-sm text-gray-500 mb-6">
            You will receive an email confirmation shortly with your order
            details.
          </p>
          <div className="space-x-4">
            <Link
              to="/orders"
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block"
            >
              View Order History
            </Link>
            <Link
              to="/"
              className="bg-gray-600 text-white px-6 py-2 rounded hover:bg-gray-700 inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Show loading while cart is being fetched
  if (cartLoading || cart === null) {
    return (
      <div className="pt-20 text-center">
        <div className="text-gray-600">Loading your cart...</div>
      </div>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="pt-20 text-center">
        <p className="text-gray-600">
          Your cart is empty. Please add items before checkout.
        </p>
        <Link
          to="/"
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 inline-block"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>

          <div className="space-y-4 mb-6">
            {cart.items.map((item, idx) => (
              <div
                key={idx}
                className="flex items-center space-x-4 border-b pb-4 last:border-b-0"
              >
                <img
                  src={
                    item.product?.image?.[0]
                      ? `http://localhost:5000${item.product.image[0]}`
                      : "/placeholder.jpg"
                  }
                  alt={item.product?.name || "Product"}
                  className="w-16 h-16 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-medium">
                    {item.product?.name || "Unknown Product"}
                  </h3>
                  <p className="text-sm text-gray-600">
                    ${item.product?.price || 0} x {item.quantity}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">
                    ${((item.product?.price || 0) * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center text-lg font-bold">
              <span>Total:</span>
              <span>${calculateTotal().toFixed(2)}</span>
            </div>
          </div>
        </div>

        {/* Checkout Form */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Shipping & Payment</h2>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-medium mb-3">Shipping Address</h3>
              <div className="grid grid-cols-1 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Street Address *
                  </label>
                  <input
                    type="text"
                    name="street"
                    value={shippingAddress.street}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={shippingAddress.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      value={shippingAddress.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={shippingAddress.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country *
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={shippingAddress.country}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium mb-3">Payment Method</h3>
              <div className="space-y-2">
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Credit/Debit Card</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>PayPal</span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="paymentMethod"
                    value="bank_transfer"
                    checked={paymentMethod === "bank_transfer"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mr-2"
                  />
                  <span>Bank Transfer</span>
                </label>
              </div>
            </div>

            {/* Place Order Button */}
            <button
              type="submit"
              disabled={loading || cartLoading}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading
                ? "Placing Order..."
                : cartLoading
                ? "Loading..."
                : `Place Order - $${calculateTotal().toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
