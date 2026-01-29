import React, { useState } from "react";
import "./Accordion.css";

const items = [
  {
    title: "Getting Started",
    icon: "media/images/icon_1.png",
    iconSize: 60,
    links: [
      "Login & Session Restore",
      "Dashboard Overview",
      "Protected Routes",
      "Demo Account Setup",
    ],
  },
  {
    title: "Trading & Orders",
    icon: "media/images/icon_2.png",
    iconSize: 60,
    links: [
      "Placing Buy Orders",
      "Placing Sell Orders",
      "Order History",
      "Execution Engine Workflow",
    ],
  },
  {
    title: "Portfolio Analytics",
    icon: "media/images/icon_7.png",
    iconSize: 50,
    links: [
      "Holdings Tracking",
      "Positions Monitoring",
      "Real-Time P&L Calculation",
      "Portfolio Value Summary",
    ],
  },
  {
    title: "Brokerage & Charges",
    icon: "media/images/icon_3.png",
    iconSize: 60,
    links: [
      "Charges Breakdown",
      "Gross vs Net Profit",
      "Trade Cost Transparency Module",
    ],
  },
  {
    title: "Smart Alerts",
    icon: "media/images/icon_4.png",
    iconSize: 60,
    links: [
      "Exposure Warnings",
      "Daily Drop Alerts",
      "Recent Activity Insights",
    ],
  },
  {
    title: "Backend Architecture",
    icon: "media/images/icon_5.png",
    iconSize: 60,
    links: [
      "Routes → Controllers → Services",
      "MongoDB Models & Schemas",
      "Caching + Market Data Integration",
      "API Security with Middleware",
    ],
  },
];

function Accordion() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="landing-section support-accordion-section py-5">
      <div className="container">
        <div className="row g-4">
          {/* ✅ LEFT: Accordion */}
          <div className="col-lg-8 col-12">
            <div className="accordion-custom">
              {items.map((item, i) => (
                <div className="card mb-3" key={item.title}>
                  <div className="card-header p-0">
                    <button
                      type="button"
                      className="btn w-100 text-start d-flex justify-content-between align-items-center accordion-btn"
                      onClick={() => toggle(i)}
                    >
                      <span className="corner-block">
                        <img
                          src={item.icon}
                          alt={item.title}
                          width={item.iconSize}
                          height={item.iconSize}
                        />
                      </span>

                      <span className="accordion-title fs-5">
                        {item.title}
                      </span>

                      <span className="accordion-caret">
                        {open === i ? (
                          <i className="fa-solid fa-angle-up"></i>
                        ) : (
                          <i className="fa-solid fa-angle-down"></i>
                        )}
                      </span>
                    </button>
                  </div>

                  <div className={`accordion-panel ${open === i ? "open" : ""}`}>
                    <ul>
                      {item.links.map((txt) => (
                        <li key={txt}>
                          <span>{txt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* ✅ RIGHT: Sidebar */}
          <div className="col-lg-4 col-12">
            <div className="support-alert">
              <p className="mb-2 fw-bold">Platform Note</p>
              <p className="text-muted mb-0">
                TradeMint is a full-stack fintech engineering project built to
                demonstrate real trading workflows, execution logic, and backend
                architecture.
              </p>
            </div>

            <div className="support-quicklinks mt-4">
              <div className="support-quicklinks-head">
                Quick Links
              </div>

              <a className="support-quicklink" href="/login">
                Launch Dashboard
              </a>
              <a className="support-quicklink" href="/dashboard/orders">
                View Orders
              </a>
              <a className="support-quicklink" href="/dashboard/holdings">
                View Holdings
              </a>
              <a className="support-quicklink" href="/charges">
                Brokerage Module
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Accordion;
