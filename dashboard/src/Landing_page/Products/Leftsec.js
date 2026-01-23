import React from "react";

function Leftsec({
  imageURL,
  productName,
  productDescription,
  tryDemo,
  learnMore,
  googlePlay,
  appStore,
  coin,
}) {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="product-row">
          <div className="product-img">
            <img src="/media/images/kite.png" alt={productName} />
          </div>

          <div className="product-info">
            <h2>{productName}</h2>
            <p>{productDescription}</p>

            <div className="product-links">
              {tryDemo && (
                <a href={tryDemo}>
                  Try demo <i className="fa fa-long-arrow-right" />
                </a>
              )}
              {learnMore && (
                <a href={learnMore}>
                  Learn more <i className="fa fa-long-arrow-right" />
                </a>
              )}
              {coin && (
                <a href={coin}>
                  Coin <i className="fa fa-long-arrow-right" />
                </a>
              )}
            </div>

            <div className="store-badges">
              {googlePlay && (
                <a href={googlePlay}>
                  <img src="/media/images/googlePlayBadge.svg" alt="Google Play" />
                </a>
              )}
              {appStore && (
                <a href={appStore}>
                  <img src="/media/images/appstoreBadge.svg" alt="App Store" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Leftsec;
