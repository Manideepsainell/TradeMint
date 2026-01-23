import React from "react";

function Rightsec({ prodtitle, description, learnmore, connect, imgurl }) {
  return (
    <section className="landing-section">
      <div className="landing-inner">
        <div className="product-row reverse">
          <div className="product-img">
            <img src={`/${imgurl}`} alt={prodtitle} />
          </div>

          <div className="product-info">
            <h2>{prodtitle}</h2>
            <p>{description}</p>

            <div className="product-links">
              {learnmore && (
                <a href={learnmore}>
                  Learn more <i className="fa fa-long-arrow-right" />
                </a>
              )}
              {connect && (
                <a href={connect}>
                  Kite Connect <i className="fa fa-long-arrow-right" />
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
