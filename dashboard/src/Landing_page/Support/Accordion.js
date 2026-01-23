import React, { useState } from "react";
import "./Accordion.css";

const items = [
  {
    title: "Account Opening",
    icon: "media/images/icon_1.png",
    iconSize: 60,
    links: [
      "Resident individual",
      "Minor",
      "Non Resident Indian (NRI)",
      "Company, Partnership, HUF and LLP",
      "Glossary",
    ],
  },
  {
    title: "Your Zerodha Account",
    icon: "media/images/icon_2.png",
    iconSize: 60,
    links: [
      "Your Profile",
      "Account Modification",
      "Client Master Report (CMR) and DP",
      "Nomination",
      "Transfer and conversion of securities",
    ],
  },
  {
    title: "Kite",
    icon: "media/images/icon_7.png",
    iconSize: 45,
    links: [
      "IPO",
      "Trading FAQs",
      "Margin Trading Facility (MTF) and Margins",
      "Charts and orders",
      "Alerts and Nudges",
      "General",
    ],
  },
  {
    title: "Funds",
    icon: "media/images/icon_3.png",
    iconSize: 60,
    links: ["Add money", "Withdraw money", "Add bank accounts", "eMandates"],
  },
  {
    title: "Console",
    icon: "media/images/icon_4.png",
    iconSize: 65,
    links: [
      "Portfolio",
      "Corporate actions",
      "Funds statement",
      "Reports",
      "Profile",
      "Segments",
    ],
  },
  {
    title: "Coin",
    icon: "media/images/icon_5.png",
    iconSize: 65,
    links: [
      "Mutual funds",
      "National Pension Scheme (NPS)",
      "Fixed Deposit (FD)",
      "Features on Coin",
      "Payments and Orders",
      "General",
    ],
  },
];

function Accordion() {
  const [open, setOpen] = useState(null);
  const toggle = (i) => setOpen(open === i ? null : i);

  return (
    <section className="landing-section support-accordion-section py-5">
      {/* ✅ use BOOTSTRAP container */}
      <div className="container">
        <div className="row g-4">
          {/* LEFT: ACCORDION */}
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

                      <span className="accordion-title fs-5">{item.title}</span>

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
                          <a href="#">{txt}</a>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: SIDEBAR */}
          <div className="col-lg-4 col-12">
            <div className="support-alert">
              <ul className="support-alert-list">
                <li>
                  <a href="#">
                    Exclusion of F&amp;O contracts on 8 securities from August
                    29, 2025
                  </a>
                </li>
                <li>
                  <a href="#">
                    Revision in expiry day of Index and Stock derivatives
                    contracts
                  </a>
                </li>
              </ul>
            </div>

            <div className="support-quicklinks mt-4">
              <div className="support-quicklinks-head">Quick links</div>

              <a className="support-quicklink" href="#">
                1. Track account opening
              </a>
              <a className="support-quicklink" href="#">
                2. Track segment activation
              </a>
              <a className="support-quicklink" href="#">
                3. Intraday margins
              </a>
              <a className="support-quicklink" href="#">
                4. Kite user manual
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Accordion;
