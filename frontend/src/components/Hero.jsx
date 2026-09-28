import React from "react";
import { Link } from "react-router-dom";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClock,
  FiShield,
} from "react-icons/fi";

const Hero = () => {
  return (
    <section className="hero-section">
      <div className="hero container">
        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            Trusted healthcare, designed around you
          </div>

          <h1>
            Better care starts
            <span> with the right doctor.</span>
          </h1>

          <p>
            Find experienced doctors, explore medical
            specialties and book your appointment in just
            a few clicks.
          </p>

          <div className="hero-actions">
            <Link
              to="/appointment"
              className="primary-btn"
            >
              Book an appointment
              <FiArrowRight />
            </Link>

            <Link
              to="/about"
              className="secondary-btn"
            >
              Learn more
            </Link>
          </div>

          <div className="hero-trust">
            <div>
              <FiCheckCircle />
              <span>Verified doctors</span>
            </div>

            <div>
              <FiClock />
              <span>Easy scheduling</span>
            </div>

            <div>
              <FiShield />
              <span>Secure & private</span>
            </div>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-glow"></div>

          <div className="hero-image-card">
            <img
              src="/heroine.png"
              alt="Healthcare professional"
            />
          </div>

          <div className="floating-card floating-card-one">
            <strong>10+</strong>
            <span>Medical specialties</span>
          </div>

          <div className="floating-card floating-card-two">
            <span className="status-dot"></span>
            <div>
              <strong>Appointments</strong>
              <span>Available today</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;