import React, { useEffect, useState } from "react";
import api from "../api/axios";

import "../styles/modal.css";

const TradeModal = ({ uid, mode = "BUY", onClose, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isSell = mode === "SELL";

  /* ============================================================
     CLOSE MODAL
  ============================================================ */

  const handleClose = () => {
    if (!loading && onClose) onClose();
  };

  /* ============================================================
     ESC KEY CLOSE
  ============================================================ */

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  /* ============================================================
     PLACE ORDER
  ============================================================ */

  const handleSubmit = async () => {
    setError("");

    if (qty <= 0) return setError("Quantity must be at least 1.");

    if (price !== "" && Number(price) <= 0) {
      return setError("Price must be greater than 0.");
    }

    try {
      setLoading(true);

      await api.post("/api/user/orders", {
        name: uid,
        qty: Number(qty),
        price: price === "" ? null : Number(price), // ✅ market order support
        mode,
      });

      if (onSuccess) onSuccess();
      handleClose();
    } catch (err) {
      console.error("Order Error:", err);
      setError("Failed to place order. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="trade-modal-overlay">
      <div className="trade-modal">
        {/* Header */}
        <div className="trade-modal-header">
          <h3>
            {mode} <span>{uid}</span>
          </h3>

          <button className="trade-close-btn" onClick={handleClose}>
            ✕
          </button>
        </div>

        {/* Body */}
        <div className="trade-modal-body">
          <div className="trade-inputs">
            {/* Quantity */}
            <fieldset>
              <legend>Quantity</legend>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </fieldset>

            {/* Price */}
            <fieldset>
              <legend>Price</legend>
              <input
                type="number"
                step="0.05"
                value={price}
                placeholder="Market price"
                onChange={(e) => setPrice(e.target.value)}
              />
            </fieldset>
          </div>

          {/* Error Message */}
          {error && <p className="trade-error">{error}</p>}
        </div>

        {/* Footer */}
        <div className="trade-modal-footer">
          <p className="trade-hint">
            Confirm your order before submitting.
          </p>

          <div className="trade-actions">
            <button
              className={`btn ${isSell ? "btn-danger" : "btn-primary"}`}
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Placing..." : mode}
            </button>

            <button className="btn btn-soft" onClick={handleClose}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradeModal;
