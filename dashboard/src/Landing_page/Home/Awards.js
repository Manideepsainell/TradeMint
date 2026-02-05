import React from "react";
import "./Awards.css";

function Awards() {
  return (
    <section className="awards-section">
      <div className="awards-container">
        <div className="awards-grid">

          {/* ✅ Left: Architecture Image */}
          <div className="awards-image-wrap">
            <img
              src="/media/platform/Architecture.png"
              alt="TradeMint System Architecture"
              className="awards-hero-img"
            />
          </div>

          {/* ✅ Right: Content */}
          <div className="awards-content">
            <h2 className="awards-title">
              TradeMint — System Architecture
            </h2>

            <p className="awards-subtitle">
              TradeMint is engineered as a full-stack MERN trading simulation
              platform with modular backend services, secure authentication,
              and scalable portfolio management.
            </p>

            {/* ✅ Feature Grid */}
            <div className="awards-features">
              <div className="feature-item">Modular REST API Architecture</div>
              <div className="feature-item">Node.js + Express Backend</div>
              <div className="feature-item">JWT Auth via HttpOnly Cookies</div>

              <div className="feature-item">MongoDB Portfolio Persistence</div>
              <div className="feature-item">Service Layer Trading Logic</div>
              <div className="feature-item">Frontend–Backend Data Sync</div>
            </div>

            {/* ✅ Note */}
            <div className="awards-note">
              Built as an internship-ready fintech engineering project focused on
              real trading workflows, scalable design, and clean architecture.
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Awards;
