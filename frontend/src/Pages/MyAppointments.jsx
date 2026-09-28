import React, { useContext, useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiCalendar,
  FiClock,
  FiUser,
  FiArrowLeft,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { Context } from "../main";
import api from "../services/api";

const MyAppointments = () => {
  const { isAuthenticated } = useContext(Context);
  const navigateTo = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const { data } = await api.get(
          "/api/v1/appointment/patient",
          {
            withCredentials: true,
          }
        );

        setAppointments(data.appointments || []);
      } catch (error) {
        toast.error(
          error.response?.data?.message ||
            "Unable to load appointments."
        );
      } finally {
        setLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchAppointments();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const getStatusIcon = (status) => {
    if (status === "Accepted") {
      return <FiCheckCircle />;
    }

    if (status === "Rejected") {
      return <FiXCircle />;
    }

    return <FiAlertCircle />;
  };

  const formatDate = (date) => {
    if (!date) return "Not available";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
      return date;
    }

    return parsedDate.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };

  return (
    <main className="my-appointments-page">
      <div className="my-appointments-header">
        <div>
          <span className="appointment-eyebrow">
            MEDICARE
          </span>

          <h1>My Appointments</h1>

          <p>
            View and track all your appointments with
            MediCare.
          </p>
        </div>

        <button
          type="button"
          className="book-appointment-small"
          onClick={() => navigateTo("/appointment")}
        >
          <FiCalendar />
          Book Appointment
        </button>
      </div>

      {loading ? (
        <section className="appointments-loading">
          <div className="appointment-loader"></div>
          <p>Loading your appointments...</p>
        </section>
      ) : appointments.length === 0 ? (
        <section className="appointments-empty">
          <div className="appointments-empty-icon">
            <FiCalendar />
          </div>

          <h2>No Appointments Yet</h2>

          <p>
            You haven't booked any appointments with
            MediCare yet.
          </p>

          <button
            type="button"
            className="book-appointment-small"
            onClick={() => navigateTo("/appointment")}
          >
            <FiCalendar />
            Book Your First Appointment
          </button>
        </section>
      ) : (
        <section className="patient-appointments-list">
          {appointments.map((appointment) => (
            <article
              className="patient-appointment-card"
              key={appointment._id}
            >
              <div className="patient-appointment-top">
                <div>
                  <span className="appointment-card-label">
                    Appointment
                  </span>

                  <h2>
                    Dr. {appointment.doctor?.firstName}{" "}
                    {appointment.doctor?.lastName}
                  </h2>

                  <p>{appointment.department}</p>
                </div>

                <span
                  className={`appointment-status ${
                    appointment.status?.toLowerCase()
                  }`}
                >
                  {getStatusIcon(appointment.status)}
                  {appointment.status}
                </span>
              </div>

              <div className="patient-appointment-details">
                <div className="appointment-detail">
                  <FiCalendar />

                  <div>
                    <span>Date</span>
                    <strong>
                      {formatDate(
                        appointment.appointment_date
                      )}
                    </strong>
                  </div>
                </div>

                <div className="appointment-detail">
                  <FiUser />

                  <div>
                    <span>Patient</span>
                    <strong>
                      {appointment.firstName}{" "}
                      {appointment.lastName}
                    </strong>
                  </div>
                </div>

                <div className="appointment-detail">
                  <FiClock />

                  <div>
                    <span>Previous Visit</span>
                    <strong>
                      {appointment.hasVisited
                        ? "Yes"
                        : "No"}
                    </strong>
                  </div>
                </div>
              </div>

              <div className="appointment-card-footer">
                <span>
                  Appointment ID:{" "}
                  {appointment._id?.slice(-8)}
                </span>
              </div>
            </article>
          ))}
        </section>
      )}

      <button
        type="button"
        className="appointments-back-button"
        onClick={() => navigateTo("/")}
      >
        <FiArrowLeft />
        Back to Home
      </button>
    </main>
  );
};

export default MyAppointments;