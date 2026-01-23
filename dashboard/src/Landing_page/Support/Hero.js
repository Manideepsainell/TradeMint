import React from "react";

function Hero() {
  return (
   <section className="support-hero">
  <div className="search-portal py-4">
    <div className="container">
          {/* top row */}
          <div className="d-flex justify-content-between align-items-center gap-3 flex-wrap mb-2">
            <p className="supp mb-0">Support Portal</p>

            <button className="btn support-ticket-btn">My tickets</button>
          </div>

          {/* search */}
          <div className="input-group support-search">
            <span className="input-group-text bg-white border-0">
              <i className="fa-solid fa-magnifying-glass text-muted"></i>
            </span>

            <input
              type="text"
              className="form-control border-0 text-muted"
              placeholder="Eg: How do I open my account, How do I activate F&O..."
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
