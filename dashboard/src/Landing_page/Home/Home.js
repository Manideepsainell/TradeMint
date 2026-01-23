import React from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import Openacc from "../Openacc";

function Home() {
  return (
    <div className="landing-home">
      <Hero />
      <Awards />
      <Stats />
      <Pricing />
      <Education />
      <Openacc />
    </div>
  );
}

export default Home;
