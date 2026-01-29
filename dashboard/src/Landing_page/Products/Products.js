import React from "react";
import Hero from "./Hero";
import Leftsec from "./Leftsec";
import Rightsec from "./Rightsec";
import Universe from "./Universe";
import './Products.css'
function Products() {
  return (
    <>
      <Hero />

      {/* ✅ Module 1 */}
      <Leftsec
        imageURL="/media/images/homeHero.png"
        productName="TradeMint Dashboard"
        productDescription="A modern trading dashboard with secure login, live market prices, and portfolio-level tracking inspired by real brokerage platforms."
        primaryLink={{ href: "/login", label: "Launch Dashboard" }}
        secondaryLink={{ href: "#features", label: "Explore Features" }}
      />

      {/* ✅ Module 2 */}
      <Rightsec
        prodtitle="Holdings & Portfolio Analytics"
        description="Track investments in real time with current value, profit/loss calculations, and portfolio-level summaries inside the dashboard."
        imgurl="/media/images/console.png"
      />

      {/* ✅ Module 3 */}
      <Leftsec
        imageURL="/media/images/education.svg"
        productName="Smart Alerts Engine"
        productDescription="TradeMint provides portfolio insights such as exposure warnings, stock movement alerts, and activity-based notifications."
        primaryLink={{ href: "/dashboard", label: "View Alerts" }}
      />

      {/* ✅ Module 4 */}
      <Rightsec
  prodtitle="Portfolio Holdings Overview"
  description="Track investments in real time with portfolio summaries and P&L insights."
  imgurl="/media/images/console.png"
  primaryLink={{ href: "/dashboard/holdings", label: "View Holdings" }}
/>


      {/* ✅ Module 5 */}
      <Leftsec
        imageURL="/media/images/ecosystem.png"
        productName="Production Backend Architecture"
        productDescription="Built with modular routes, controllers, services, middleware, caching, and secure cookie-based JWT authentication."
        primaryLink={{ href: "#features", label: "See Architecture" }}
      />

      {/* ✅ Closing Section */}
      <section className="landing-section">
        <div className="landing-inner text-center">
         <p className="products-closing-text">

            TradeMint is built as an internship-ready MERN fintech engineering
            project — focused on execution accuracy, portfolio intelligence, and
            clean platform design.
          </p>
        </div>
      </section>

      <Universe />
    </>
  );
}

export default Products;
