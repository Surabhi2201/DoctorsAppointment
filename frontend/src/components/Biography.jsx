import React from "react";

const Biography = ({ imageUrl }) => {
  return (
    <section className="container biography">
      <div className="banner">
        <img src={imageUrl} alt="MediCare healthcare team" />
      </div>

      <div className="banner">
        <span className="biography-label">ABOUT MEDICARE</span>

        <h3>Who We Are</h3>

        <p>
          MediCare is a modern healthcare platform created to make
          healthcare simpler, more accessible, and easier to manage.
          We bring patients, doctors, and essential healthcare services
          together in one convenient digital space.
        </p>

        <p>
          From discovering the right specialist to booking an
          appointment and keeping track of your visits, MediCare is
          designed to make every step of the healthcare journey
          smoother.
        </p>

        <p>
          Our focus is on creating a patient-friendly experience where
          technology supports better access to care without making
          healthcare feel complicated.
        </p>

        <div className="biography-highlights">
          <div>
            <strong>01</strong>
            <span>Patient-first experience</span>
          </div>

          <div>
            <strong>02</strong>
            <span>Simple appointment management</span>
          </div>

          <div>
            <strong>03</strong>
            <span>Connected healthcare services</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Biography;