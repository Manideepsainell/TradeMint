import React, { useEffect, useState } from "react";
import api from "../api/axios";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);

  /* ============================================================
     FETCH RECENT ORDERS
  ============================================================ */

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        const res = await api.get("/api/user/orders");
        setOrders((res.data?.data || []).slice(0, 5));
      } catch (err) {
        console.error("Recent Orders Error:", err);
      }
    };

    fetchRecentOrders();
  }, []);

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="summary-card recent-orders-card">
      <div className="title">Recent Orders</div>

      {orders.length === 0 ? (
        <p className="empty-note">No recent orders yet 📭</p>
      ) : (
        <ul className="recent-orders">
          {orders.map((order) => (
            <li key={order._id}>
              <span className="stock">{order.name}</span>

              <span
                className={`badge ${
                  order.mode === "BUY" ? "buy" : "sell"
                }`}
              >
                {order.mode}
              </span>

              <span className="qty">Qty: {order.qty}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;
