import React, { useState } from "react";
import "./Accordion.css";

import {
  Rocket,
  ArrowLeftRight,
  PieChart,
  Calculator,
  BellRing,
  Network,
} from "lucide-react";

const items = [
  {
    title: "Getting Started",
    icon: <Rocket size={22} />,
    desc: "Platform onboarding, demo login, and dashboard navigation.",
    details: [
      "Create an account using secure authentication powered by JWT cookies.",
      "Login restores your session automatically using protected backend routes.",
      "Dashboard layout includes Watchlist, Holdings, Orders, Funds & Alerts.",
      "TradeMint uses live-like market tracking for demo trading simulation.",
    ],
  },

  {
    title: "Trading & Orders",
    icon: <ArrowLeftRight size={22} />,
    desc: "Execution workflows inspired by real brokerage systems.",
    details: [
      "Buy and Sell orders can be placed directly from the Watchlist panel.",
      "Orders are stored in MongoDB and reflected instantly in your order book.",
      "SELL orders calculate profit, charges, and net returns automatically.",
      "Each execution updates Holdings, Positions, and Portfolio value in sync.",
    ],
  },

  {
    title: "Portfolio Analytics",
    icon: <PieChart size={22} />,
    desc: "Holdings performance, allocation, and portfolio value insights.",
    details: [
      "Holdings show investment cost, live value, and unrealized P&L.",
      "Portfolio Allocation donut chart visualizes exposure across stocks.",
      "Holding Value bar graph tracks your largest contributors by capital.",
      "Dashboard hero provides gross return %, charges paid, and net profit.",
    ],
  },

  {
    title: "Brokerage & Charges",
    icon: <Calculator size={22} />,
    desc: "Net profit logic including realistic transaction charges.",
    details: [
      "TradeMint simulates realistic brokerage and tax deductions per SELL order.",
      "Charges include brokerage caps, exchange fees, STT, GST, and stamp duty.",
      "Gross profit differs from net profit after execution costs are applied.",
      "This makes TradeMint different from basic portfolio clones.",
    ],
  },

  {
    title: "Smart Alerts",
    icon: <BellRing size={22} />,
    desc: "Exposure warnings and portfolio-driven alert signals.",
    details: [
      "Exposure alerts detect over-concentration in single stocks.",
      "Price alerts allow users to set target triggers above/below market value.",
      "Recent portfolio activity generates insight-driven dashboard messages.",
      "Alerts mimic decision-support systems used in real fintech apps.",
    ],
  },

  {
    title: "Platform Architecture",
    icon: <Network size={22} />,
    desc: "How TradeMint is built using modular MERN services.",
    details: [
      "Frontend: React + Chart.js dashboard with premium UI components.",
      "Backend: Node + Express modular REST APIs (orders, holdings, insights).",
      "Database: MongoDB persistence for trades, portfolios, and users.",
      "Authentication: Secure JWT stored in HTTP-only cookies.",
      "System designed like Zerodha-style execution + portfolio intelligence.",
    ],
  },
];

function Accordion() {
  const [open, setOpen] = useState(null);

  const toggle = (i) => {
    setOpen(open === i ? null : i);
  };

  return (
    <section className="support-accordion-section">
      <div className="support-container">
        {/* LEFT */}
        <div className="accordion-left">
          {items.map((item, i) => (
            <div key={item.title} className="accordion-item">
              <button className="accordion-btn" onClick={() => toggle(i)}>
                <span className="accordion-icon">{item.icon}</span>

                <div className="accordion-text">
                  <h3>{item.title}</h3>
                  <p>{item.desc}</p>
                </div>

                <span className="accordion-toggle">
                  {open === i ? "−" : "+"}
                </span>
              </button>

              {/* Expand Panel */}
              {open === i && (
                <div className="accordion-panel">
                  <ul>
                    {item.details.map((line, idx) => (
                      <li key={idx}>{line}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="accordion-right">
          <div className="support-note-box">
            <h4>Platform Note</h4>
            <p>
              TradeMint is a full-stack MERN trading simulation platform built to
              demonstrate execution workflows, brokerage calculations, and
              portfolio intelligence — inspired by real brokerage dashboards.
            </p>
          </div>

          <div className="support-links-box">
            <h4>Quick Links</h4>

            <a href="/login">Launch Dashboard</a>
            <a href="/dashboard/orders">View Orders</a>
            <a href="/dashboard/holdings">Holdings Analytics</a>
            <a href="/charges">Brokerage Module</a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Accordion;
