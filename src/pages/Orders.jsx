import React, { useEffect, useState } from "react";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("/api/orders", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch orders");
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

  if (loading)
    return <div className="pt-10 text-center">Loading orders...</div>;
  if (error)
    return <div className="pt-10 text-center text-red-500">{error}</div>;

  return (
    <div className="pt-10">
      <h2 className="text-xl font-bold mb-4">Your Orders</h2>
      {orders && orders.length > 0 ? (
        <ul>
          {orders.map((order, idx) => (
            <li key={idx} className="mb-4 border-b pb-2">
              <div>Order #{order._id}</div>
              <div>Total: ${order.total}</div>
              <div>Status: {order.status}</div>
              <div>
                Items:
                <ul className="ml-4">
                  {order.items.map((item, i) => (
                    <li key={i}>
                      {item.product?.name || item.product} x {item.quantity}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <div>You have no orders yet.</div>
      )}
    </div>
  );
};

export default Orders;
