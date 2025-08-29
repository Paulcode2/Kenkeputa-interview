import React, { useState } from 'react';

const PlaceOrder = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json'
        }
      });
      if (!res.ok) throw new Error('Order failed');
      setSuccess(true);
      // Optionally clear cart in UI or refetch cart
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10 flex flex-col items-center">
      <h2 className="text-xl font-bold mb-4">Place Order</h2>
      {error && <div className="text-red-500 mb-2">{error}</div>}
      {success && <div className="text-green-600 mb-2">Order placed successfully!</div>}
      <button
        onClick={handlePlaceOrder}
        className="bg-black text-white px-8 py-3 text-sm rounded"
        disabled={loading}
      >
        {loading ? 'Placing Order...' : 'Place Order'}
      </button>
    </div>
  );
};

export default PlaceOrder;
