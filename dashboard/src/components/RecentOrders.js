import React, { useEffect, useState } from "react";
import api from "../api/axios";

const RecentOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ============================================================
     FETCH RECENT ORDERS
  ============================================================ */

  useEffect(() => {
    const fetchRecentOrders = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get("/api/user/orders");

        const allOrders = res.data?.data || [];

        // ✅ Show only latest 5 orders
        setOrders(allOrders.slice(0, 5));
      } catch (err) {
        console.error("Recent Orders Error:", err);
        setError("Unable to load recent orders.");
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, []);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return (
      <div className="summary-card recent-orders-card">
        <div className="title">Recent Orders</div>
        <p className="empty-note">Loading recent orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="summary-card recent-orders-card">
        <div className="title">Recent Orders</div>
        <p className="empty-note">{error}</p>
      </div>
    );
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="summary-card recent-orders-card">
      <div className="title">Recent Orders</div>

      {orders.length === 0 ? (
        <p className="empty-note">No recent orders yet 📭</p>
      ) : (
        <ul className="recent-orders">
          {orders.map((order) => {
            const mode = order.mode?.toUpperCase() || "BUY";

            return (
              <li key={order._id}>
                {/* Stock Name */}
                <span className="stock">{order.name}</span>

                {/* Buy / Sell Badge */}
                <span
                  className={`badge ${
                    mode === "BUY" ? "buy" : "sell"
                  }`}
                >
                  {mode}
                </span>

                {/* Quantity */}
                <span className="qty">Qty: {order.qty}</span>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default RecentOrders;
