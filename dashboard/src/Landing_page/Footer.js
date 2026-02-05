import React from "react";
import './Footer.css'
function Footer() {
  return (
    <footer className="landing-footer">
      <div className="footer-inner">
        <div className="footer-grid">
          {/* Brand */}
          <div>
            <p className="footer-brand">Trade<span>Mint</span></p>
            <p className="footer-copy">
              © 2025 TradeMint Technologies. All rights reserved.
            </p>
          </div>

          {/* Platform */}
          <div>
            <p className="footer-title">Platform</p>
            <a href="/login" className="footer-link">Dashboard</a>
            <a href="/dashboard/orders" className="footer-link">Orders</a>
            <a href="/dashboard/holdings" className="footer-link">Holdings</a>
            <a href="/dashboard/positions" className="footer-link">Positions</a>
          </div>

          {/* Features */}
          <div>
            <p className="footer-title">Features</p>
            <a href="#features" className="footer-link">Execution Engine</a>
            <a href="#features" className="footer-link">Brokerage Engine</a>
            <a href="#features" className="footer-link">Portfolio Analytics</a>
            <a href="#features" className="footer-link">Smart Alerts</a>
          </div>

          {/* Project */}
          <div>
            <p className="footer-title">Project</p>
            <a href="/about" className="footer-link">About TradeMint</a>
            <a href="/support" className="footer-link">Help Center</a>
            <a href="#features" className="footer-link">Tech Architecture</a>
          </div>
        </div>
        {/* Demo Account */}

<div>
  <p className="footer-title">Demo Login</p>

  <p className="footer-demo">
    Email: <b>Nikhil@gmail.com</b>
  </p>
  <p className="footer-demo">
    Password: <b>123456</b>
  </p>

  <p className="footer-note">
    Use this demo account to explore TradeMint instantly.
  </p>
</div>


        {/* Disclaimer */}
        <div className="footer-disclaimer">
          <p>
            TradeMint is an educational fintech engineering project built to simulate
            real-world trading platform workflows including order execution,
            brokerage calculations, and portfolio analytics.
          </p>

          <p>
            This platform does not provide real financial services or execute
            actual market trades. Market data is used for demonstration purposes only.
          </p>
        </div>
        {/* Social */}
<div>
  <p className="footer-title">Connect</p>

  <a
    href="https://github.com/Manideepsainell"
    target="_blank"
    rel="noreferrer"
    className="footer-link"
  >
    GitHub →
  </a>

  <a
    href="https://linkedin.com"
    target="_blank"
    rel="noreferrer"
    className="footer-link"
  >
    LinkedIn →
  </a>
</div>

      </div>
    </footer>
  );
}

export default Footer;
