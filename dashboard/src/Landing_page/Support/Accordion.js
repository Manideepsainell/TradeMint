import React, { useState } from "react";
import "./Accordion.css";
import { Rocket, ArrowLeftRight, PieChart, Calculator, BellRing, Network } from "lucide-react";

const items = [
  {
    title: "Getting Started",
    icon: <Rocket size={28} />,
    links: [
      "How to create an account and log in",
      "Understanding the dashboard layout",
      "Using the demo account",
    ],
  },
  {
    title: "Trading & Orders",
    icon: <ArrowLeftRight size={28} />,
    links: [
      "How to place buy and sell orders",
      "Tracking order history",
      "Understanding order execution",
    ],
  },
  {
    title: "Portfolio Analytics",
    icon: <PieChart size={28} />,
    links: [
      "Reading holdings and positions",
      "How P&L is calculated",
      "Portfolio value overview",
    ],
  },
  {
    title: "Brokerage & Charges",
    icon: <Calculator size={28} />,
    links: [
      "Breakdown of brokerage fees",
      "Gross vs net profit",
    ],
  },
  {
    title: "Smart Alerts",
    icon: <BellRing size={28} />,
    links: [
      "Setting price alerts",
      "Understanding portfolio alerts",
    ],
  },
  {
    title: "Platform Architecture",
    icon: <Network size={28} />,
    links: [
      "Frontend–backend communication",
      "Database and security design",
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
                       <span className="help-icon">
  {item.icon}
</span>

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
  TradeMint is a full-stack trading simulation platform designed to
  demonstrate how modern brokerage dashboards handle orders, portfolios,
  alerts, and backend systems in real-world applications.
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
