import React from "react";
import Hero from "../components/Hero";
import Biography from "../components/Biography";

const AboutUs = () => {
  return (
    <>
      <Hero
        title="About MediCare"
        imageUrl="/images/ent.jpg"
      />

      <section className="about-medicare-intro">
        <div className="about-intro-content">
          <span>ABOUT MEDICARE</span>

          <h1>
            Healthcare that puts
            <br />
            <strong>people first.</strong>
          </h1>

          <p>
            MediCare is designed to make accessing quality
            healthcare simpler, more convenient, and more
            connected. From finding the right doctor to
            scheduling an appointment, we bring essential
            healthcare services together in one place.
          </p>
        </div>

        <div className="about-intro-stats">
          <div>
            <strong>01</strong>
            <span>Easy Appointment Booking</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Experienced Healthcare Professionals</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Patient-focused Care</span>
          </div>
        </div>
      </section>

      <Biography imageUrl="/departments/cardio.jpg" />

      <section className="about-medicare-values">
        <div className="about-values-heading">
          <span>WHY MEDICARE</span>

          <h2>
            A simpler way to manage
            <br />
            your healthcare.
          </h2>
        </div>

        <div className="about-values-grid">

          <article>
            <div className="about-value-number">01</div>

            <h3>Accessible Care</h3>

            <p>
              Find healthcare professionals and
              services through a simple, convenient
              experience.
            </p>
          </article>

          <article>
            <div className="about-value-number">02</div>

            <h3>Personalized Experience</h3>

            <p>
              Choose a department and doctor based
              on your healthcare needs.
            </p>
          </article>

          <article>
            <div className="about-value-number">03</div>

            <h3>Connected Healthcare</h3>

            <p>
              Keep your appointment journey organized
              from booking through your visit.
            </p>
          </article>

        </div>
      </section>
    </>
  );
};

export default AboutUs;