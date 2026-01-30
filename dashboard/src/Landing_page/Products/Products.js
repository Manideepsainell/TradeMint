import React from "react";
import Hero from "./Hero";
import Leftsec from "./Leftsec";
import Rightsec from "./Rightsec";
import Universe from "./Universe";
import "./Products.css";

function Products() {
  return (
    <>
      <Hero />

      {/* 🚀 Module 1 — Dashboard Overview */}
      <Leftsec
        imageURL="/media/platform/Dashboard.png"
        productName="TradeMint Trading Dashboard"
        productDescription="A modern trading dashboard featuring secure authentication, live market tracking, portfolio summaries, and real-time financial insights — inspired by production brokerage platforms."
        primaryLink={{ href: "/login", label: "Launch Dashboard" }}
        secondaryLink={{ href: "#features", label: "Explore Features" }}
      />

      {/* 📊 Module 2 — Holdings Analytics */}
      <Rightsec
        prodtitle="Holdings & Portfolio Analytics"
        description="Monitor your investments with real-time valuation, profit/loss tracking, asset allocation insights, and portfolio performance visualization."
        imgurl="/media/platform/Holdings.png"
      />

      {/* 🚨 Module 3 — Smart Alerts */}
      <Leftsec
        imageURL="/media/platform/Alerts.png"
        productName="Smart Alerts Engine"
        productDescription="Receive intelligent portfolio alerts including exposure warnings, stock movement notifications, and activity-based insights to stay informed about market risks."
        primaryLink={{ href: "/dashboard", label: "View Alerts" }}
      />

      {/* 🧾 Module 4 — Orders System */}
      <Rightsec
        prodtitle="Order Execution & History"
        description="Track buy and sell orders with timestamps, execution records, and portfolio impact — replicating real-world trading workflows."
        imgurl="/media/platform/Orders.png"
        primaryLink={{ href: "/dashboard/orders", label: "View Orders" }}
      />

      {/* 🧱 Module 5 — Backend Architecture */}
      <Leftsec
  imageURL="/media/platform/Architecture.png"
  productName="TradeMint — Backend Architecture"
  productDescription="TradeMint’s backend is built using a modular Node.js + Express architecture with structured service layers, secure authentication, and scalable portfolio data management."
  primaryLink={{ href: "#features", label: "View Backend Architecture" }}
/>


      {/* ✨ Closing Section */}
      <section className="landing-section">
        <div className="landing-inner text-center">
          <p className="products-closing-text">
            TradeMint is built as an internship-ready MERN fintech engineering
            project — focused on execution accuracy, portfolio intelligence, and
            clean, scalable platform design.
          </p>
        </div>
      </section>

      <Universe />
    </>
  );
}

export default Products;
