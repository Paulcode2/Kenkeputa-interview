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

  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "";

  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  });

  const [paymentMethod, setPaymentMethod] = useState("card");

  // Fetch cart only once
  useEffect(() => {
    if (!cartFetched && fetchCart) {
      setCartFetched(true);
      fetchCart();
    }
  }, [cartFetched, fetchCart]);

  // Redirect if cart is empty
  useEffect(() => {
    if (cart && Array.isArray(cart.items) && cart.items.length === 0) {
      navigate("/cart");
    }
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
      if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        throw new Error("Cart is empty. Add items before checkout.");
      }

      const orderItems = cart.items.map((item, index) => {
        if (!item.product?._id) {
          throw new Error(`Cart item ${index} has invalid product data`);
        }
        return {
          product: item.product._id,
          quantity: item.quantity,
        };
      });

      const orderData = {
        items: orderItems,
        shippingAddress,
        paymentMethod,
      };

      const res = await fetch(`${apiUrl}/api/orders`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to place order");
      }

      const data = await res.json();

      if (!data.order || !data.order._id) {
        throw new Error("Order placed but no order ID returned");
      }

      setOrderId(data.order._id);
      setOrderPlaced(true);

      // Refresh cart after order
      await fetchCart();
    } catch (err) {
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

  if (cartLoading || !cart) {
    return (
      <div className="pt-20 text-center">
        <div className="text-gray-600">Loading your cart...</div>
      </div>
    );
  }

  if (!cart.items || cart.items.length === 0) {
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
                      ? `${apiUrl}${item.product.image[0]}`
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
                <input
                  type="text"
                  name="street"
                  placeholder="Street Address"
                  value={shippingAddress.street}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="city"
                    placeholder="City"
                    value={shippingAddress.city}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="state"
                    placeholder="State"
                    value={shippingAddress.state}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    name="zipCode"
                    placeholder="ZIP Code"
                    value={shippingAddress.zipCode}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                  <input
                    type="text"
                    name="country"
                    placeholder="Country"
                    value={shippingAddress.country}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div>
              <h3 className="text-lg font-medium mb-3">Payment Method</h3>
              <div className="space-y-2">
                {["card", "paypal", "bank_transfer"].map((method) => (
                  <label key={method} className="flex items-center">
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method}
                      checked={paymentMethod === method}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="mr-2"
                    />
                    <span>
                      {method === "card"
                        ? "Credit/Debit Card"
                        : method === "paypal"
                        ? "PayPal"
                        : "Bank Transfer"}
                    </span>
                  </label>
                ))}
              </div>
            </div>

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
