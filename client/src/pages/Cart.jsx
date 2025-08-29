import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const Cart = () => {
  const { cart, cartLoading, cartError, fetchCart, removeFromCart, clearCart, addToCart } = useContext(ShopContext);

  useEffect(() => {
    fetchCart();
    // eslint-disable-next-line
  }, []);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity <= 0) {
      await removeFromCart(productId);
    } else {
      await addToCart(productId, newQuantity);
    }
  };

  const calculateTotal = () => {
    if (!cart || !cart.items) return 0;
    return cart.items.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0);
  };

  if (cartLoading) return <div className="pt-20 text-center">Loading cart...</div>;
  if (cartError) return <div className="pt-20 text-center text-red-500">{cartError}</div>;

  return (
    <div className="pt-20 px-4 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      {cart && cart.items && cart.items.length > 0 ? (
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="space-y-4">
              {cart.items.map((item, idx) => (
                <div key={idx} className="flex items-center space-x-4 border-b pb-4 last:border-b-0">
                  <img
                    src={item.product?.image?.[0] ? `http://localhost:5000${item.product.image[0]}` : '/placeholder.jpg'}
                    alt={item.product?.name || 'Product'}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold">{item.product?.name || 'Unknown Product'}</h3>
                    <p className="text-gray-600">${item.product?.price || 0}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item.product?._id, item.quantity - 1)}
                    >
                      -
                    </button>
                    <span className="px-3 py-1 border rounded">{item.quantity}</span>
                    <button
                      className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                      onClick={() => handleQuantityChange(item.product?._id, item.quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-semibold">${((item.product?.price || 0) * item.quantity).toFixed(2)}</p>
                    <button
                      className="text-red-500 hover:text-red-700 text-sm mt-1"
                      onClick={() => removeFromCart(item.product?._id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-bold">Total: ${calculateTotal().toFixed(2)}</h2>
              <div className="space-x-4">
                <button
                  className="px-6 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                  onClick={clearCart}
                >
                  Clear Cart
                </button>
                <Link to="/place">
                  <button className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                    Proceed to Checkout
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">🛒</div>
          <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some products to get started!</p>
          <Link to="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 inline-block">
            Continue Shopping
          </Link>
        </div>
      )}
    </div>
  );
};

export default Cart;
