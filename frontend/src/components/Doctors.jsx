import React, { useEffect, useMemo, useState } from "react";
import { FiArrowRight, FiSearch, FiUser } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("All");
  const [loading, setLoading] = useState(true);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get("/api/v1/user/doctors");
        setDoctors(data.doctors || []);
      } catch (error) {
        console.error("Failed to fetch doctors:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const departments = useMemo(() => {
    const uniqueDepartments = [
      ...new Set(
        doctors
          .map((doctor) => doctor.doctorDepartment)
          .filter(Boolean)
      ),
    ];

    return ["All", ...uniqueDepartments];
  }, [doctors]);

  const filteredDoctors = useMemo(() => {
    return doctors.filter((doctor) => {
      const fullName =
        `${doctor.firstName} ${doctor.lastName}`.toLowerCase();

      const searchMatch =
        fullName.includes(search.toLowerCase()) ||
        doctor.doctorDepartment
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const departmentMatch =
        department === "All" ||
        doctor.doctorDepartment === department;

      return searchMatch && departmentMatch;
    });
  }, [doctors, search, department]);

  return (
    <section className="doctors-section">
      <div className="container">

        {/* Heading */}
        <div className="doctors-heading">
          <div>
            <span className="section-label">
              OUR DOCTORS
            </span>

            <h2>
              Meet the people
              <span> behind your care.</span>
            </h2>

            <p>
              Browse our healthcare professionals and find
              the right specialist for your needs.
            </p>
          </div>

          <div className="doctor-count">
            <strong>{doctors.length}</strong>
            <span>Doctors available</span>
          </div>
        </div>

        {/* Search */}
        <div className="doctor-search">
          <FiSearch />

          <input
            type="text"
            placeholder="Search by doctor or specialty..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Department filters */}
        <div className="doctor-filters">
          {departments.map((item) => (
            <button
              key={item}
              className={
                department === item
                  ? "doctor-filter active"
                  : "doctor-filter"
              }
              onClick={() => setDepartment(item)}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Loading */}
        {loading && (
          <div className="doctors-loading">
            <div className="loading-spinner"></div>
            <p>Finding our doctors...</p>
          </div>
        )}

        {/* Doctors */}
        {!loading && filteredDoctors.length > 0 && (
          <div className="doctors-grid">
            {filteredDoctors.map((doctor) => (
              <article
                className="doctor-card"
                key={doctor._id}
              >
                <div className="doctor-image-wrapper">
                  {doctor.docAvatar?.url ? (
                    <img
                      src={doctor.docAvatar.url}
                      alt={`Dr. ${doctor.firstName} ${doctor.lastName}`}
                      className="doctor-image"
                    />
                  ) : (
                    <div className="doctor-placeholder">
                      <FiUser />
                    </div>
                  )}

                  <span className="doctor-specialty">
                    {doctor.doctorDepartment ||
                      "General Medicine"}
                  </span>
                </div>

                <div className="doctor-card-content">
                  <h3>
                    Dr. {doctor.firstName} {doctor.lastName}
                  </h3>

                  <p className="doctor-department">
                    {doctor.doctorDepartment ||
                      "Healthcare Specialist"}
                  </p>

                  <p className="doctor-description">
                    Professional medical care focused on
                    providing a comfortable and patient-first
                    experience.
                  </p>

                  <button
                    className="doctor-book-btn"
                    onClick={() => navigateTo("/appointment")}
                  >
                    Book appointment
                    <FiArrowRight />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

        {/* No doctors */}
        {!loading && filteredDoctors.length === 0 && (
          <div className="no-doctors">
            <FiUser />

            <h3>No doctors found</h3>

            <p>
              Try searching for another doctor or
              specialty.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setDepartment("All");
              }}
            >
              Clear filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default Doctors;