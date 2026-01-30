import React from "react";
import "./Leftsec.css"; // same CSS reused

function Rightsec({
  imgurl,
  prodtitle,
  description,
  primaryLink,
  secondaryLink,
}) {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="product-row reverse">

          {/* Image (Right Side) */}
          <div className="product-img">
            <div className="product-image-wrapper">
              <img src={imgurl} alt={prodtitle} />
            </div>
          </div>

          {/* Content */}
          <div className="product-info">
            <h2>{prodtitle}</h2>
            <p>{description}</p>

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

export default Rightsec;
