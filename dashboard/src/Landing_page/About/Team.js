import React from "react";
import "./Team.css";
import { FaReact, FaNodeJs, FaDatabase,FaShieldAlt,FaChartLine } from "react-icons/fa";
import { SiExpress, SiMongodb } from "react-icons/si";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function Team() {
  return (
   <section className="about-team-section">
  <div className="about-team-inner">

    <h1 className="team-title">Project Creator</h1>

    {/* Avatar */}
    <div className="team-avatar">TM</div>

    <h2 className="team-name">Manideep</h2>
    <p className="team-role">MERN Stack Developer</p>

    {/* Tech Stack Icons */}
    <div className="team-tech">
      <FaReact title="React" />
      <FaNodeJs title="Node.js" />
      <SiExpress title="Express" />
      <SiMongodb title="MongoDB" />
    </div>

    {/* Description */}
    <div className="team-right">
      <p>
        TradeMint was built as a <strong>full-stack fintech engineering project</strong>
        to understand how modern trading platforms operate behind the scenes.
      </p>

      <p>
        The focus is on <strong>backend architecture</strong>, <strong>realistic trade logic</strong>,
        and <strong>portfolio analytics</strong> rather than just UI cloning.
      </p>

      <p>
        This project demonstrates skills in <strong>API design</strong>, <strong>database modeling</strong>,
        and <strong>production-style system structuring</strong>.
      </p>
    </div>

    {/* Skills Pills */}
    <div className="team-skills">
      <div className="team-skill"><FaDatabase /> MongoDB Data Modeling</div>
      <div className="team-skill"><FaShieldAlt /> Secure JWT Auth</div>
      <div className="team-skill"><FaChartLine /> Trading Analytics</div>
    </div>

    {/* Links */}
   <div className="team-links">
  <a
    href="https://github.com/Manideepsainell"
    target="_blank"
    rel="noopener noreferrer"
    className="team-link github"
  >
    <FaGithub />
    GitHub
  </a>

  <a
    href="https://www.linkedin.com/in/manideep-sai-97681a330/"
    target="_blank"
    rel="noopener noreferrer"
    className="team-link linkedin"
  >
    <FaLinkedin />
    LinkedIn
  </a>
</div>

  </div>
</section>

  );
}

export default Team;
