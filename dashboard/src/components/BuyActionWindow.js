import React, { useContext, useState } from "react";
import api from "../api/axios";
import GeneralContext from "./GeneralContext";
import "./BuyActionWindow.css";

const BuyActionWindow = ({ uid }) => {
  const [stockQuantity, setStockQuantity] = useState(1);
  const [stockPrice, setStockPrice] = useState(0.0);

  const { closeBuyWindow } = useContext(GeneralContext);

  const handleBuyClick = async () => {
    try {
      await api.post("/api/user/orders", {
        name: uid,
        qty: Number(stockQuantity),
        price: Number(stockPrice),
        mode: "BUY",
      });

      closeBuyWindow();
    } catch (err) {
      console.error("Error placing order:", err);
    }
  };

  return (
    <div className="buy-window" id="buy-window" draggable="true">
      {/* Header */}
      <div className="buy-window-header">
      <button className="dash-btn dash-btn-blue">Buy</button>   
      <button className="dash-btn dash-btn-grey">Cancel</button>

      </div>

      {/* Inputs */}
      <div className="regular-order">
        <div className="inputs">
          <fieldset>
            <legend>Qty.</legend>
            <input
              type="number"
              min="1"
              name="qty"
              onChange={(e) => setStockQuantity(e.target.value)}
              value={stockQuantity}
            />
          </fieldset>

          <fieldset>
            <legend>Price</legend>
            <input
              type="number"
              name="price"
              step="0.05"
              onChange={(e) => setStockPrice(e.target.value)}
              value={stockPrice}
            />
          </fieldset>
        </div>
      </div>

      {/* Buttons */}
      <div className="buttons">
        <span>Margin required ₹140.65</span>

        <div className="buy-window-actions">
          <button className="btn btn-blue" onClick={handleBuyClick}>
            Buy
          </button>

          {/* ✅ Cancel should NOT be Link */}
          <button className="btn btn-grey" onClick={closeBuyWindow}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyActionWindow;
