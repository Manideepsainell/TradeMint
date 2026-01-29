import React from "react";
import './Team.css';
function Team() {
  return (
    <section className="about-team-section">
      <div className="about-team-inner">
        <h1 className="team-title">Project Creator</h1>

        <div className="team-grid">
          {/* ✅ Left Profile */}
          <div className="team-left">
            <div className="team-avatar">
              TM
            </div>

            <h2 className="team-name">Manideep</h2>
            <p className="team-role">MERN Stack Developer</p>
          </div>

          {/* ✅ Right Description */}
          <div className="team-right">
            <p>
              TradeMint was developed as a full-stack fintech engineering project
              to explore how modern trading platforms handle real-world
              workflows — from secure authentication to portfolio execution.
            </p>

            <p>
              The platform focuses on backend architecture, brokerage-aware trade
              calculations, and portfolio insights rather than just UI cloning.
            </p>

            <p>
              This project demonstrates skills in MERN development, API design,
              database modeling, and production-style system structuring.
            </p>

            <p className="team-links">
              Connect:
              <a href="#" className="team-link">
                GitHub
              </a>
              <a href="#" className="team-link">
                LinkedIn
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Team;
