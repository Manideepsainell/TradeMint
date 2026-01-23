import React from "react";
import Hero from "./Hero";
import Leftsec from "./Leftsec";
import Rightsec from "./Rightsec";
import Universe from "./Universe";

function Products() {
  return (
    <>
      <Hero />

      <Leftsec
        imageURL="media/images/kite.png"
        productName="Kite"
        productDescription="Our ultra-fast flagship trading platform with streaming market data, advanced charts, an elegant UI, and more. Enjoy the Kite experience seamlessly on your Android and iOS devices."
        tryDemo="#"
        learnMore="#"
        googlePlay="#"
        appStore="#"
      />

      <Rightsec
        prodtitle="Console"
        description="The central dashboard for your Zerodha account. Gain insights into your trades and investments with in-depth reports and visualisations."
        learnmore="#"
        imgurl="media/images/console.png"
      />

      <Leftsec
        imageURL="media/images/coin.png"
        productName="Coin"
        productDescription="Buy direct mutual funds online, commission-free, delivered directly to your Demat account. Enjoy the investment experience on your Android and iOS devices."
        coin="#"
        googlePlay="#"
        appStore="#"
      />

      <Rightsec
        prodtitle="Kite Connect API"
        description="Build powerful trading platforms and experiences with our super simple HTTP/JSON APIs."
        connect="#"
        imgurl="media/images/landing.svg"
      />

      <Leftsec
        imageURL="media/images/varsity.png"
        productName="Varsity mobile"
        productDescription="An easy to grasp collection of stock market lessons with in-depth coverage and illustrations."
        googlePlay="#"
        appStore="#"
      />

      {/* ✅ fixed spacing section */}
      <section className="landing-section">
        <div className="landing-inner text-center">
          <p className="fs-4" style={{ margin: 0 }}>
            Want to know more about our technology stack? Check out the{" "}
            <a href="#" style={{ textDecoration: "none" }}>
              Zerodha.tech
            </a>{" "}
            blog.
          </p>
        </div>
      </section>

      <Universe />
    </>
  );
}

export default Products;
