import React from "react";

function Footer() {
  return (
    <footer className="landing-footer border-top py-5">
      <div className="container">
        <div className="row mt-4">
          <div className="col">
            <img
              src="/media/images/logo.svg"
              alt="logo"
              style={{ width: "50%" }}
            />
            <p className="mt-3">
              &copy;2010 - 2025, Zerodha Broking Ltd. All rights reserved.
            </p>
          </div>

          <div className="col">
            <p>Account</p>
            <a href="#" className="footer-link">Open demat account</a><br />
            <a href="#" className="footer-link">Minor demat account</a><br />
            <a href="#" className="footer-link">NRI demat account</a><br />
            <a href="#" className="footer-link">Commodity</a><br />
            <a href="#" className="footer-link">Dematerialisation</a><br />
            <a href="#" className="footer-link">Fund transfer</a><br />
            <a href="#" className="footer-link">MTF</a><br />
            <a href="#" className="footer-link">Referral program</a><br />
          </div>

          <div className="col">
            <p>Support</p>
            <a href="#" className="footer-link">Contact us</a><br />
            <a href="#" className="footer-link">Support portal</a><br />
            <a href="#" className="footer-link">How to file a complaint?</a><br />
            <a href="#" className="footer-link">Status of your complaints</a><br />
            <a href="#" className="footer-link">Bulletin</a><br />
            <a href="#" className="footer-link">Circular</a><br />
            <a href="#" className="footer-link">Z-Connect blog</a><br />
            <a href="#" className="footer-link">Downloads</a><br />
          </div>

          <div className="col">
            <p>Company</p>
            <a href="#" className="footer-link">About</a><br />
            <a href="#" className="footer-link">Philosophy</a><br />
            <a href="#" className="footer-link">Press & media</a><br />
            <a href="#" className="footer-link">Careers</a><br />
            <a href="#" className="footer-link">Zerodha Cares (CSR)</a><br />
            <a href="#" className="footer-link">Zerodha.tech</a><br />
            <a href="#" className="footer-link">Open source</a><br />
          </div>

          <div className="col">
            <p>Quick links</p>
            <a href="#" className="footer-link">Upcoming IPOs</a><br />
            <a href="#" className="footer-link">Brokerage charges</a><br />
            <a href="#" className="footer-link">Market holidays</a><br />
            <a href="#" className="footer-link">Economic calendar</a><br />
            <a href="#" className="footer-link">Calculators</a><br />
            <a href="#" className="footer-link">Markets</a><br />
            <a href="#" className="footer-link">Sectors</a><br />
          </div>
        </div>

        {/* Disclaimer Section */}
        <div className="mt-5 footer-disclaimer">
          <p>
            Zerodha Broking Ltd.: Member of NSE, BSE & MCX – SEBI Registration no.: INZ000031633
            CDSL/NSDL: Depository services through Zerodha Broking Ltd. – SEBI Registration no.: IN-DP-431-2019
            Commodity Trading through Zerodha Commodities Pvt. Ltd. MCX: 46025; SEBI Registration no.: INZ000038238
            Registered Address: Zerodha Broking Ltd., #153/154, 4th Cross, Dollars Colony, Opp. Clarence Public School,
            J.P Nagar 4th Phase, Bengaluru - 560078, Karnataka, India. For any complaints pertaining to securities broking
            please write to <a href="mailto:complaints@zerodha.com"> complaints@zerodha.com</a>, for DP related to{" "}
            <a href="mailto:dp@zerodha.com">dp@zerodha.com</a>. Please ensure you carefully read the Risk Disclosure Document
            as prescribed by SEBI | ICF
          </p>

          <p>
            Procedure to file a complaint on
            <a href="#"> SEBI SCORES</a>: Register on SCORES portal. Mandatory details for filing complaints on SCORES: Name,
            PAN, Address, Mobile Number, E-mail ID. Benefits: Effective Communication, Speedy redressal of grievances.
          </p>

          <p>
            <a href="#">Smart Online Dispute Resolution</a> |{" "}
            <a href="#">Grievances Redressal Mechanism</a>
          </p>

          <p>
            Investments in securities market are subject to market risks; read all related documents carefully before investing.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
