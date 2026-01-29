import React from "react";
import './Rightsec.css'
function Rightsec({ prodtitle, description, primaryLink, secondaryLink, imgurl }) {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="product-row reverse">
          {/* ✅ Image */}
          <div className="product-img">
            <img src={imgurl} alt={prodtitle} />
          </div>

          {/* ✅ Content */}
          <div className="product-info">
            <h2>{prodtitle}</h2>
            <p>{description}</p>

            {/* ✅ TradeMint Links */}
            <div className="product-links">
              {primaryLink && (
                <a href={primaryLink.href} className="landing-link">
                  {primaryLink.label}{" "}
                  <i className="fa fa-long-arrow-right" />
                </a>
              )}

              {secondaryLink && (
                <a href={secondaryLink.href} className="landing-link">
                  {secondaryLink.label}{" "}
                  <i className="fa fa-long-arrow-right" />
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
