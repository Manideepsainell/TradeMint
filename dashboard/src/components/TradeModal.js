import React, { useState } from "react";
import api from "../api/axios";

import "../styles/modal.css";

const TradeModal = ({ uid, mode = "BUY", onClose, onSuccess }) => {
  const [qty, setQty] = useState(1);
  const [price, setPrice] = useState("");

  const isSell = mode === "SELL";

  /* ============================================================
     CLOSE MODAL
  ============================================================ */

  const handleClose = () => {
    if (onClose) onClose();
  };

  /* ============================================================
     PLACE ORDER
  ============================================================ */

  const handleSubmit = async () => {
    try {
      await api.post("/api/user/orders", {
        name: uid,
        qty: Number(qty),
        price: Number(price),
        mode,
      });

      alert(`✅ ${mode} Order Placed Successfully!`);

      if (onSuccess) onSuccess();
      handleClose();
    } catch (err) {
      console.error("Order Error:", err);
      alert("❌ Failed to place order.");
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

        {/* Inputs */}
        <div className="trade-modal-body">
          <div className="trade-inputs">
            <fieldset>
              <legend>Quantity</legend>
              <input
                type="number"
                min="1"
                value={qty}
                onChange={(e) => setQty(e.target.value)}
              />
            </fieldset>

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
        </div>

        {/* Footer */}
        <div className="trade-modal-footer">
          <p className="trade-hint">Confirm your order before submitting.</p>

          <div className="trade-actions">
            <button
              className={`btn ${isSell ? "btn-danger" : "btn-primary"}`}
              onClick={handleSubmit}
            >
              {mode}
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
