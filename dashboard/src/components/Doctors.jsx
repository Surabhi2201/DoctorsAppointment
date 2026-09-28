import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiMail,
  FiPhone,
  FiCalendar,
  FiUser,
  FiArrowLeft,
  FiPlus,
  FiActivity,
} from "react-icons/fi";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../services/api";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);

  const { isAuthenticated } = useContext(Context);

  const navigateTo = useNavigate();

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/user/doctors",
          {
            withCredentials: true,
          }
        );

        setDoctors(data.doctors || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load doctors."
        );
      }
    };

    if (isAuthenticated) {
      fetchDoctors();
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <main className="admin-main doctors-page">

      {/* HEADER */}
      <div className="doctors-page-header">

        <div>
          <span className="dashboard-eyebrow">
            MEDICARE
          </span>

          <h1>Our Doctors</h1>

          <p>
            View and manage the doctors registered with
            MediCare.
          </p>
        </div>

        <button
          className="add-doctor-button"
          onClick={() =>
            navigateTo("/doctor/addnew")
          }
        >
          <FiPlus />
          Add Doctor
        </button>

      </div>

      {/* SUMMARY */}
      <div className="doctors-summary">

        <div className="doctors-summary-icon">
          <FiActivity />
        </div>

        <div>
          <span>Registered Doctors</span>
          <strong>{doctors.length}</strong>
        </div>

        <div className="doctors-summary-text">
          <span>
            Doctors currently available in the
            MediCare system
          </span>
        </div>

      </div>

      {/* DOCTOR LIST */}
      {doctors.length > 0 ? (

        <section className="doctors-grid">

          {doctors.map((doctor) => (

            <article
              className="doctor-admin-card"
              key={doctor._id}
            >

              {/* IMAGE */}
              <div className="doctor-card-top">

                <div className="doctor-avatar-large">

                  {doctor.docAvatar?.url ? (
                    <img
                      src={doctor.docAvatar.url}
                      alt={`${doctor.firstName} ${doctor.lastName}`}
                    />
                  ) : (
                    <FiUser />
                  )}

                </div>

                <span className="doctor-status">
                  Active
                </span>

              </div>

              {/* NAME */}
              <div className="doctor-card-heading">

                <h2>
                  Dr. {doctor.firstName}{" "}
                  {doctor.lastName}
                </h2>

                <span>
                  {doctor.doctorDepartment}
                </span>

              </div>

              {/* DETAILS */}
              <div className="doctor-card-details">

                <div className="doctor-detail-row">
                  <FiMail />

                  <div>
                    <span>Email</span>
                    <strong>{doctor.email}</strong>
                  </div>
                </div>

                <div className="doctor-detail-row">
                  <FiPhone />

                  <div>
                    <span>Phone</span>
                    <strong>{doctor.phone}</strong>
                  </div>
                </div>

                <div className="doctor-detail-row">
                  <FiCalendar />

                  <div>
                    <span>Date of Birth</span>
                    <strong>
                      {doctor.dob
                        ? new Date(
                            doctor.dob
                          ).toLocaleDateString(
                            "en-IN",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )
                        : "Not available"}
                    </strong>
                  </div>
                </div>

                <div className="doctor-detail-row">
                  <FiUser />

                  <div>
                    <span>Gender</span>
                    <strong>
                      {doctor.gender}
                    </strong>
                  </div>
                </div>

              </div>

            </article>

          ))}

        </section>

      ) : (

        <section className="doctors-empty">

          <div className="doctors-empty-icon">
            <FiUser />
          </div>

          <h2>No Registered Doctors</h2>

          <p>
            Add a doctor to start building your
            MediCare care team.
          </p>

          <button
            className="add-doctor-button"
            onClick={() =>
              navigateTo("/doctor/addnew")
            }
          >
            <FiPlus />
            Add Doctor
          </button>

        </section>

      )}

      {/* BACK */}
      <button
        className="doctors-back-button"
        onClick={() => navigateTo("/")}
      >
        <FiArrowLeft />
        Back to Overview
      </button>

    </main>
  );
};

export default Doctors;