import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";

const Cart = () => {
  const { cart, cartLoading, cartError, fetchCart, removeFromCart, clearCart } =
    useContext(ShopContext);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  if (cartLoading)
    return <div className="pt-10 text-center">Loading cart...</div>;
  if (cartError)
    return <div className="pt-10 text-center text-red-500">{cartError}</div>;

  return (
    <div className="pt-10">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      {cart && cart.items && cart.items.length > 0 ? (
        <>
          <ul>
            {cart.items.map((item, idx) => (
              <li key={idx} className="mb-2 flex items-center gap-2">
                {item.product?.name || item.product} x {item.quantity}
                <button
                  className="ml-2 px-2 py-1 bg-red-500 text-white rounded text-xs"
                  onClick={() =>
                    removeFromCart(item.product?._id || item.product)
                  }
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
          <button
            className="mt-4 px-4 py-2 bg-gray-700 text-white rounded"
            onClick={clearCart}
          >
            Clear Cart
          </button>
        </>
      ) : (
        <div>Your cart is empty.</div>
      )}
    </div>
  );
};

export default Cart;
