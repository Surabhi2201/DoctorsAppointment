import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  FiArrowUpRight,
  FiHeart,
} from "react-icons/fi";

const Departments = () => {
  const departmentsArray = [
    {
      name: "Cardiology",
      description: "Heart & cardiovascular care",
      imageUrl: "/departments/cardio.jpg",
    },
    {
      name: "Neurology",
      description: "Brain & nervous system care",
      imageUrl: "/departments/neuro.jpg",
    },
    {
      name: "Pediatrics",
      description: "Specialized care for children",
      imageUrl: "/departments/pedia.jpg",
    },
    {
      name: "Orthopedics",
      description: "Bones, joints & mobility",
      imageUrl: "/departments/ortho.jpg",
    },
    {
      name: "Dermatology",
      description: "Skin & wellness care",
      imageUrl: "/departments/derma.jpg",
    },
    {
      name: "ENT",
      description: "Ear, nose & throat care",
      imageUrl: "/departments/ent.jpg",
    },
    {
      name: "Radiology",
      description: "Advanced diagnostic imaging",
      imageUrl: "/departments/radio.jpg",
    },
    {
      name: "Oncology",
      description: "Specialized cancer care",
      imageUrl: "/departments/onco.jpg",
    },
  ];

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1200 },
      items: 3,
    },
    tablet: {
      breakpoint: { max: 1200, min: 700 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 700, min: 0 },
      items: 1,
    },
  };

  return (
    <section className="departments-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="section-label">
              OUR SPECIALTIES
            </span>

            <h2>
              Care for every stage
              <span> of your health.</span>
            </h2>
          </div>

          <p>
            Explore our medical specialties and find the
            right care for your needs.
          </p>
        </div>

        <Carousel
          responsive={responsive}
          infinite
          autoPlay
          autoPlaySpeed={4000}
          arrows
          itemClass="department-slide"
        >
          {departmentsArray.map((department) => (
            <article
              className="department-card"
              key={department.name}
            >
              <img
                src={department.imageUrl}
                alt={department.name}
              />

              <div className="department-overlay"></div>

              <div className="department-content">
                <div className="department-icon">
                  <FiHeart />
                </div>

                <div>
                  <h3>{department.name}</h3>
                  <p>{department.description}</p>
                </div>

                <button className="department-arrow">
                  <FiArrowUpRight />
                </button>
              </div>
            </article>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default Departments;