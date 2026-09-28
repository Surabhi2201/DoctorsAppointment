import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";
import MessageForm from "../components/MessageForm";
import Departments from "../components/Departments";
import Doctors from "../components/Doctors";
const Home = () => {
  return (
    <>
      <Hero />

      <section className="stats-section container">
        <div className="stats-card">
          <strong>50+</strong>
          <span>Healthcare professionals</span>
        </div>

        <div className="stats-card">
          <strong>9+</strong>
          <span>Medical specialties</span>
        </div>

        <div className="stats-card">
          <strong>24/7</strong>
          <span>Patient support</span>
        </div>

        <div className="stats-card">
          <strong>100%</strong>
          <span>Patient focused</span>
        </div>
      </section>

      <Biography imageUrl="/biography.png" />

      <Departments />

      <Doctors />
      
      <MessageForm />
    </>
  );
};

export default Home;