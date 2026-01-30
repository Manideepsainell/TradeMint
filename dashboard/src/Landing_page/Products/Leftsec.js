import React from "react";
import "./Leftsec.css";

function Leftsec({
  imageURL,
  productName,
  productDescription,
  primaryLink,
  secondaryLink,
}) {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="product-row">

          {/* Image */}
          <div className="product-img">
            <div className="product-image-wrapper">
              <img src={imageURL} alt={productName} />
            </div>
          </div>

          {/* Content */}
          <div className="product-info">
            <h2>{productName}</h2>
            <p>{productDescription}</p>

            <div className="product-links">
              {primaryLink && (
                <a href={primaryLink.href} className="landing-link">
                  {primaryLink.label} <i className="fa fa-long-arrow-right" />
                </a>
              )}
              {secondaryLink && (
                <a href={secondaryLink.href} className="landing-link">
                  {secondaryLink.label} <i className="fa fa-long-arrow-right" />
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
