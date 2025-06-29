import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
const AboutUs = () => {
  return (
    <>
      <Hero
        title={"Learn More About Us | HealthCare Medical Institute"}
        imageUrl={"/images/ent.jpg"}
      />
      <Biography imageUrl={"/departments/cardio.jpg"} />
    </>
  );
};

export default AboutUs;
