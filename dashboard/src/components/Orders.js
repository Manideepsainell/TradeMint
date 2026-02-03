import React, { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [expandedId, setExpandedId] = useState(null);

  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  /* ============================================================
     FETCH ORDERS
  ============================================================ */

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);

        const res = await api.get("/api/user/orders");

        const data = res.data?.data || [];

        // ✅ Latest orders first
        const sorted = data.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setOrders(sorted);
      } catch (err) {
        console.error("Orders Fetch Error:", err);
        setErrorMsg("Failed to load orders. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  /* ============================================================
     HELPERS
  ============================================================ */

  const toggleExpand = (id) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  const formatMoney = (value) => Number(value || 0).toFixed(2);

  /* ============================================================
     UI STATES
  ============================================================ */

  if (loading) {
    return <div className="route-loading">Loading your orders...</div>;
  }

  if (errorMsg) {
    return <div className="route-loading">{errorMsg}</div>;
  }

  if (!orders.length) {
    return <div className="route-loading">No orders placed yet 📭</div>;
  }

  /* ============================================================
     MAIN UI
  ============================================================ */

  return (
    <div className="orders-container">
      <h2 className="orders-title">Your Orders</h2>

      <div className="orders-list">
        {orders.map((order) => {
          const createdAt = order?.createdAt
            ? new Date(order.createdAt).toLocaleString("en-IN", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
              })
            : "--";

          const mode = order.mode?.toUpperCase();
          const isSell = mode === "SELL";

          return (
            <div
              key={order._id}
              className="order-card"
              onClick={() => toggleExpand(order._id)}
            >
              {/* HEADER */}
              <div className="order-header">
                <div>
                  <p className="order-name">{order.name}</p>
                  <p className="order-date">{createdAt}</p>
                </div>

                <span className={`order-mode ${isSell ? "sell" : "buy"}`}>
                  {mode}
                </span>
              </div>

              {/* QUICK DETAILS */}
              <div className="order-details">
                <span>
                  <strong>Qty:</strong> {order.qty}
                </span>

                <span>
                  <strong>Price:</strong>{" "}
                  {order.price ? (
                    <>₹{formatMoney(order.price)}</>
                  ) : (
                    <span className="muted">Market</span>
                  )}
                </span>
              </div>

              {/* EXPANDED INFO */}
              {expandedId === order._id && (
                <div className="order-extra">
                  <p>
                    <strong>Order ID:</strong> {order._id}
                  </p>

                  <p>
                    <strong>Status:</strong> {order.status || "Completed"}
                  </p>

                  {/* SELL PROFIT BREAKDOWN */}
                  {isSell && (
                    <>
                      <p>
                        <strong>Gross Profit:</strong> ₹
                        {formatMoney(order.grossProfit)}
                      </p>

                      <p>
                        <strong>Total Charges:</strong> ₹
                        {formatMoney(order?.charges?.totalCharges)}
                      </p>

                      <p>
                        <strong>Net Profit:</strong>{" "}
                        <span
                          className={order.netProfit >= 0 ? "profit" : "loss"}
                        >
                          ₹{formatMoney(order.netProfit)}
                        </span>
                      </p>
                    </>
                  )}

                  {/* BUY INFO */}
                  {!isSell && (
                    <p className="muted">
                      This is a BUY order. Profit will reflect once sold.
                    </p>
                  )}
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
