import React from "react";
import './Awards.css';

function Awards() {
  return (
    <section className="landing-section awards-section py-5">
      <div className="container">
        <div className="row align-items-center g-4">

          {/* 🖼 Left: System Architecture Illustration */}
          <div className="col-md-6 text-center">
            <img
              src="/media/platform/Architecture.png"
              alt="TradeMint System Architecture"
              className="img-fluid awards-hero-img"
            />
          </div>

          {/* 📝 Right: Engineering Overview */}
          <div className="col-md-6">
            <h1 className="fs-2 fw-bold">
              TradeMint — System Architecture Overview
            </h1>

            <p className="mt-3 text-muted">
              TradeMint is engineered as a full-stack MERN trading simulation
              platform, designed with modular backend services, secure
              authentication, and scalable portfolio data management.
            </p>

            {/* 🧠 Technical Feature Grid */}
            <div className="row mt-4">
              <div className="col-6">
                <ul className="ps-3 feature-list">
                  <li className="mb-2">Modular REST API Architecture</li>
                  <li className="mb-2">Node.js + Express Backend</li>
                  <li className="mb-2">JWT Authentication via Cookies</li>
                </ul>
              </div>

              <div className="col-6">
                <ul className="ps-3 feature-list">
                  <li className="mb-2">MongoDB Portfolio Persistence</li>
                  <li className="mb-2">Service Layer for Trading Logic</li>
                  <li className="mb-2">Frontend–Backend Data Sync</li>
                </ul>
              </div>
            </div>

            {/* 🏗 Project Note */}
            <div className="mt-4 project-note">
              <p className="small text-muted mb-0">
                Built as an internship-ready fintech engineering project focused
                on clean architecture, real trading workflows, and scalable
                system design.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Awards;
