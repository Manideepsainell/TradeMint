import React from "react";
import Hero from "./Hero";
import Awards from "./Awards";
import Stats from "./Stats";
import Pricing from "./Pricing";
import Education from "./Education";
import Openacc from "../Openacc";
import Footer from "../Footer";
function Home() {
  return (
    <div className="landing-home">
      <Hero />
      <Awards />
      <Pricing />
      <Education />
      <Openacc />
      <Stats/>0
       <Footer />
    </div>
  );
}

export default Home;
