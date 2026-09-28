import React from "react";
import { Link } from "react-router-dom";
import {
  FaLocationArrow,
  FaPhone,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";
import {
  FiCalendar,
  FiArrowUpRight,
} from "react-icons/fi";

const Footer = () => {
  const hours = [
    {
      id: 1,
      day: "Monday",
      time: "9:00 AM - 11:00 PM",
    },
    {
      id: 2,
      day: "Tuesday",
      time: "12:00 PM - 12:00 AM",
    },
    {
      id: 3,
      day: "Wednesday",
      time: "10:00 AM - 10:00 PM",
    },
    {
      id: 4,
      day: "Thursday",
      time: "9:00 AM - 9:00 PM",
    },
    {
      id: 5,
      day: "Friday",
      time: "3:00 PM - 9:00 PM",
    },
    {
      id: 6,
      day: "Saturday",
      time: "9:00 AM - 3:00 PM",
    },
  ];

  return (
    <footer className="medicare-footer">
      <div className="medicare-footer-container">

        {/* BRAND */}
        <div className="footer-brand-section">
          <Link to="/" className="footer-brand">
            <div className="footer-brand-mark">
              +
            </div>

            <div>
              <strong>MediCare</strong>
              <span>Healthcare made simple</span>
            </div>
          </Link>

          <p>
            Making quality healthcare easier to access,
            one appointment at a time.
          </p>

          <Link
            to="/appointment"
            className="footer-book-button"
          >
            <FiCalendar />
            Book Appointment
            <FiArrowUpRight />
          </Link>
        </div>

        {/* QUICK LINKS */}
        <div className="footer-column">
          <h4>Quick Links</h4>

          <nav className="footer-links">
            <Link to="/">Home</Link>
            <Link to="/appointment">
              Appointments
            </Link>
            <Link to="/my-appointment">
              My Appointments
            </Link>
            <Link to="/about">About</Link>
            <Link to="/contact">Contact</Link>
          </nav>
        </div>

        {/* HOURS */}
        <div className="footer-column">
          <h4>Hours</h4>

          <div className="footer-hours">
            {hours.map((element) => (
              <div
                className="footer-hour-row"
                key={element.id}
              >
                <span>{element.day}</span>
                <span>{element.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CONTACT */}
        <div className="footer-column">
          <h4>Contact</h4>

          <div className="footer-contact-list">

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaPhone />
              </div>

              <div>
                <span>Phone</span>
                <strong>+91 98765 43210</strong>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <MdEmail />
              </div>

              <div>
                <span>Email</span>
                <strong>
                  support@medicare.demo
                </strong>
              </div>
            </div>

            <div className="footer-contact-item">
              <div className="footer-contact-icon">
                <FaLocationArrow />
              </div>

              <div>
                <span>Location</span>
                <strong>
                  Chennai, Tamil Nadu
                </strong>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="medicare-footer-bottom">
        <span>
          © 2026 MediCare. All rights reserved.
        </span>

        <span>
          Healthcare made simple.
        </span>
      </div>
    </footer>
  );
};

export default Footer;