import React, { useState } from "react";
import { FiMail, FiMapPin, FiPhone, FiSend } from "react-icons/fi";
import { toast } from "react-toastify";
import api from "../services/api";

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const { data } = await api.post(
        "/api/v1/message/send",
        formData
      );

      toast.success(data.message || "Message sent successfully!");

      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to send your message."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="medicare-contact-page">
      <section className="contact-hero">
        <div>
          <span className="dashboard-eyebrow">MEDICARE</span>
          <h1>We're Here to Help</h1>
          <p>
            Have a question, need assistance, or want to know more
            about our services? Send us a message and our team will
            get back to you.
          </p>
        </div>
      </section>

      <section className="contact-content">
        <div className="contact-info-card">
          <span className="contact-section-label">GET IN TOUCH</span>
          <h2>Let's talk about your healthcare needs.</h2>
          <p>
            Our team is here to help you with appointments,
            services, and any questions you may have.
          </p>

          <div className="contact-info-list">
            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FiPhone />
              </div>
              <div>
                <span>Phone</span>
                <strong>+91 98765 43210</strong>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FiMail />
              </div>
              <div>
                <span>Email</span>
                <strong>support@medicare.demo</strong>
              </div>
            </div>

            <div className="contact-info-item">
              <div className="contact-info-icon">
                <FiMapPin />
              </div>
              <div>
                <span>Location</span>
                <strong>Chennai, Tamil Nadu</strong>
              </div>
            </div>
          </div>
        </div>

        <form className="contact-form-card" onSubmit={handleSubmit}>
          <div className="contact-form-header">
            <span className="contact-section-label">SEND A MESSAGE</span>
            <h2>How can we help?</h2>
          </div>

          <div className="contact-form-grid">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="contact-form-grid">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <textarea
            name="message"
            placeholder="Write your message..."
            value={formData.message}
            onChange={handleChange}
            rows="6"
            required
          />

          <button type="submit" disabled={loading}>
            <FiSend />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>
      </section>
    </main>
  );
};

export default Contact;