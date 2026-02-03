import React, { createContext, useState, useCallback } from "react";
import TradeModal from "./TradeModal";

/* ============================================================
   ✅ GENERAL CONTEXT (TradeMint)
============================================================ */

const GeneralContext = createContext();

export const GeneralContextProvider = ({ children }) => {
  /* ============================================================
     MODAL STATE
  ============================================================ */

  const [tradeModal, setTradeModal] = useState({
    isOpen: false,
    uid: null,
    mode: "BUY",
  });

  /* ============================================================
     OPEN BUY / SELL WINDOWS
  ============================================================ */

  const openBuyWindow = useCallback((uid) => {
    setTradeModal({ isOpen: true, uid, mode: "BUY" });
  }, []);

  const openSellWindow = useCallback((uid) => {
    setTradeModal({ isOpen: true, uid, mode: "SELL" });
  }, []);

  /* ============================================================
     CLOSE MODAL
  ============================================================ */

  const closeTradeWindow = useCallback(() => {
    setTradeModal({ isOpen: false, uid: null, mode: "BUY" });
  }, []);

  /* ============================================================
     PROVIDER
  ============================================================ */

  return (
    <GeneralContext.Provider
      value={{
        tradeModal,
        openBuyWindow,
        openSellWindow,
        closeTradeWindow,
      }}
    >
      {children}

      {/* ✅ Unified Trade Modal */}
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
