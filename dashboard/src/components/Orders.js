import React, { useEffect, useState } from "react";
import api from "../api/axios";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      setErrorMsg("");

      try {
        const res = await api.get("/api/user/orders");

        // ✅ support both: res.data = []  OR  res.data.orders = []
        const data = Array.isArray(res.data) ? res.data : res.data?.orders || [];

        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setErrorMsg("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  if (loading) {
    return <div className="orders-loading">Loading your orders...</div>;
  }

  if (errorMsg) {
    return (
      <div className="orders-empty">
        <p>{errorMsg}</p>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="orders-empty">
        <p>You haven't placed any orders today</p>
      </div>
    );
  }

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      <div className="orders-list">
        {orders.map((order) => {
          const created = order?.createdAt
            ? new Date(order.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--";

          return (
            <div
              className={`order-card ${expandedId === order._id ? "expanded" : ""}`}
              key={order._id}
              onClick={() => toggleExpand(order._id)}
            >
              <div className="order-header">
                <div>
                  <div className="order-name">{order.name}</div>
                  <div className="order-date">{created}</div>
                </div>

                <span className={`order-mode ${order.mode === "BUY" ? "buy" : "sell"}`}>
                  {order.mode}
                </span>
              </div>

              <div className="order-details">
                <p>
                  <strong>Quantity:</strong> {order.qty}
                </p>
                <p>
                  <strong>Price:</strong> ₹{order.price}
                </p>
              </div>

              {expandedId === order._id && (
                <div className="order-extra">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>

                  <p>
                    <strong>Created:</strong>{" "}
                    {order.createdAt ? new Date(order.createdAt).toString() : "--"}
                  </p>

                  <p>
                    <strong>Last Updated:</strong>{" "}
                    {order.updatedAt ? new Date(order.updatedAt).toString() : "--"}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
