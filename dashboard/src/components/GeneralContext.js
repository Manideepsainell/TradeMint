import React, { useState } from "react";
import TradeModal from "./TradeModal";

const GeneralContext = React.createContext({
  openBuyWindow: (uid) => {},
  openSellWindow: (uid) => {},
  closeTradeWindow: () => {},
});

export const GeneralContextProvider = ({ children }) => {
  /* ============================================================
     SINGLE MODAL STATE
  ============================================================ */

  const [tradeModal, setTradeModal] = useState({
    isOpen: false,
    uid: null,
    mode: "BUY", // BUY or SELL
  });

  /* ============================================================
     OPEN BUY / SELL
  ============================================================ */

  const openBuyWindow = (uid) => {
    setTradeModal({
      isOpen: true,
      uid,
      mode: "BUY",
    });
  };

  const openSellWindow = (uid) => {
    setTradeModal({
      isOpen: true,
      uid,
      mode: "SELL",
    });
  };

  /* ============================================================
     CLOSE MODAL
  ============================================================ */

  const closeTradeWindow = () => {
    setTradeModal({
      isOpen: false,
      uid: null,
      mode: "BUY",
    });
  };

  /* ============================================================
     PROVIDER
  ============================================================ */

  return (
    <GeneralContext.Provider
      value={{
        openBuyWindow,
        openSellWindow,
        closeTradeWindow,
      }}
    >
      {children}

      {/* ✅ Render ONE Unified Modal */}
      {tradeModal.isOpen && (
        <TradeModal
          uid={tradeModal.uid}
          mode={tradeModal.mode}
          onClose={closeTradeWindow}
        />
      )}
    </GeneralContext.Provider>
  );
};

export default GeneralContext;
