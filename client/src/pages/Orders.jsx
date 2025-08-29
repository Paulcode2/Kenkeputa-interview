import React, { useEffect, useState } from 'react';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/orders', {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        if (!res.ok) throw new Error('Failed to fetch orders');
        const data = await res.json();
        setOrders(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) return <div className="pt-20 text-center">Loading orders...</div>;
  if (error) return <div className="pt-20 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-20 px-4 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Order History</h1>
      {orders && orders.length > 0 ? (
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order._id} className="bg-white rounded-lg shadow-md p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="text-lg font-semibold">Order #{order._id.slice(-8)}</h3>
                  <p className="text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString()} at{' '}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </p>
                </div>
                <div className="text-right">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </span>
                  <p className="text-2xl font-bold text-gray-900 mt-2">
                    ${order.totalAmount?.toFixed(2) || order.total?.toFixed(2)}
                  </p>
                </div>
              </div>

              {/* Shipping Address */}
              {order.shippingAddress && (
                <div className="mb-4 p-4 bg-gray-50 rounded">
                  <h4 className="font-medium mb-2">Shipping Address:</h4>
                  <p className="text-sm text-gray-600">
                    {order.shippingAddress.street}, {order.shippingAddress.city},{' '}
                    {order.shippingAddress.state} {order.shippingAddress.zipCode},{' '}
                    {order.shippingAddress.country}
                  </p>
                </div>
              )}

              {/* Order Items */}
              <div className="space-y-3">
                <h4 className="font-medium">Items:</h4>
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center space-x-4 p-3 bg-gray-50 rounded">
                    <img
                      src={item.image ? `http://localhost:5000${item.image}` : '/placeholder.jpg'}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h5 className="font-medium">{item.name}</h5>
                      <p className="text-sm text-gray-600">
                        ${item.price} x {item.quantity} = ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Actions */}
              <div className="mt-6 flex justify-end space-x-4">
                {order.status === 'delivered' && (
                  <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700">
                    Write Review
                  </button>
                )}
                {order.status === 'pending' && (
                  <button className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700">
                    Cancel Order
                  </button>
                )}
                <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Track Order
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📦</div>
          <h2 className="text-2xl font-bold mb-4">No orders yet</h2>
          <p className="text-gray-600 mb-6">Your order history will appear here once you make a purchase.</p>
          <a href="/" className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700">
            Start Shopping
          </a>
        </div>
      )}
    </div>
  );
};

export default Orders;
