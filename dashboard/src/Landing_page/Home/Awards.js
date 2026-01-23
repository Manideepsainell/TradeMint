import React from "react";

function Awards() {
  return (
    <section className="landing-section awards-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">
          <div className="col-md-6 text-center">
            <img
              src="/media/images/largestBroker.svg"
              alt="Largest broker"
              className="img-fluid"
            />
          </div>

          <div className="col-md-6">
            <h1 className="fs-2">Largest stock broker in India</h1>

            <p className="mt-3 text-muted">
              2+ million Zerodha clients contribute to over 15% of all retail
              order volumes in India daily by trading and investing in:
            </p>

            <div className="row mt-4">
              <div className="col-6">
                <ul className="ps-3">
                  <li className="mb-2">Futures and Options</li>
                  <li className="mb-2">Commodity derivatives</li>
                  <li className="mb-2">Currency derivatives</li>
                </ul>
              </div>

              <div className="col-6">
                <ul className="ps-3">
                  <li className="mb-2">Stocks & IPOs</li>
                  <li className="mb-2">Direct Mutual Funds</li>
                  <li className="mb-2">Bonds and Govt. Securities</li>
                </ul>
              </div>
            </div>

            <div className="mt-4">
              <img
                src="/media/images/pressLogos.png"
                alt="Press logos"
                className="img-fluid"
                style={{ maxWidth: "85%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Awards;
