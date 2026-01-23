import React from "react";

const Summary = () => {
  // Default values for new user
  const marginAvailable = 0;
  const marginsUsed = 0;
  const openingBalance = 0;

  const holdingsCount = 0;
  const pnl = 0;
  const pnlPercentage = 0;
  const currentValue = 0;
  const investment = 0;

  return (
    <div className="dashboard-app">
      {/* Greeting */}
      <div style={{ marginBottom: "18px" }}>
        <h2 style={{ margin: 0, fontSize: "18px", fontWeight: 800 }}>
          Hi, User!
        </h2>
        <p style={{ marginTop: "6px", color: "#6b7280", fontSize: "13px" }}>
          Here’s your account summary.
        </p>
      </div>

      {/* ✅ EQUITY CARD */}
      <div className="dashboard-app table" style={{ marginBottom: "22px" }}>
        <div className="title">Equity</div>

        <div className="data">
          <div>
            <p>Margin available</p>
            <p className="imp colored">₹{marginAvailable}</p>
          </div>

          <div>
            <p>Margins used</p>
            <p className="imp">₹{marginsUsed}</p>
          </div>

          <div>
            <p>Opening balance</p>
            <p className="imp">₹{openingBalance}</p>
          </div>
        </div>
      </div>

      {/* ✅ HOLDINGS CARD */}
      <div className="dashboard-app table">
        <div className="title">Holdings ({holdingsCount})</div>

        <div className="data">
          <div>
            <p>P&L</p>
            <p className={`imp ${pnl >= 0 ? "up" : "down"}`}>
              ₹{pnl}{" "}
              <span style={{ fontSize: "12px", fontWeight: 800 }}>
                ({pnlPercentage >= 0 ? "+" : ""}
                {pnlPercentage}%)
              </span>
            </p>
          </div>

          <div>
            <p>Current value</p>
            <p className="imp">₹{currentValue}</p>
          </div>

          <div>
            <p>Investment</p>
            <p className="imp">₹{investment}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Summary;
