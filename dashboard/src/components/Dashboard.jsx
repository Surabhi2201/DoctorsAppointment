import React, {
  useContext,
  useEffect,
  useState,
} from "react";
import { Navigate } from "react-router-dom";
import {
  FiCalendar,
  FiUsers,
  FiClock,
  FiActivity,
  FiCheckCircle,
  FiXCircle,
  FiAlertCircle,
} from "react-icons/fi";
import { toast } from "react-toastify";
import axios from "axios";
import { Context } from "../main";

const Dashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [doctorCount, setDoctorCount] = useState(0);

  const { isAuthenticated, admin } =
    useContext(Context);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [appointmentsResponse, doctorsResponse] =
          await Promise.all([
            axios.get(
              "http://localhost:5000/api/v1/appointment/getall",
              { withCredentials: true }
            ),
            axios.get(
              "http://localhost:5000/api/v1/user/doctors",
              { withCredentials: true }
            ),
          ]);

        setAppointments(
          appointmentsResponse.data.appointments || []
        );

        setDoctorCount(
          doctorsResponse.data.doctors?.length || 0
        );
      } catch (error) {
        console.error(
          "Failed to fetch dashboard data:",
          error
        );

        setAppointments([]);
        setDoctorCount(0);
      }
    };

    if (isAuthenticated) {
      fetchDashboardData();
    }
  }, [isAuthenticated]);

  const handleUpdateStatus = async (
    appointmentId,
    status
  ) => {
    try {
      const { data } = await axios.put(
        `http://localhost:5000/api/v1/appointment/update/${appointmentId}`,
        { status },
        { withCredentials: true }
      );

      setAppointments((prevAppointments) =>
        prevAppointments.map((appointment) =>
          appointment._id === appointmentId
            ? { ...appointment, status }
            : appointment
        )
      );

      toast.success(data.message);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to update appointment."
      );
    }
  };

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  const totalAppointments = appointments.length;

  const pendingAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Pending"
  ).length;

  const acceptedAppointments = appointments.filter(
    (appointment) =>
      appointment.status === "Accepted"
  ).length;

  return (
    <main className="admin-main dashboard-modern">

      {/* HEADER */}
      <div className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            MEDICARE
          </span>

          <h1>
            Welcome back,{" "}
            <span>
              {admin?.firstName || "Admin"}
            </span>
          </h1>

          <p>
            Manage your MediCare services and patient
            appointments.
          </p>
        </div>

        <div className="dashboard-date">
          <FiCalendar />

          <div>
            <span>Today</span>

            <strong>
              {new Date().toLocaleDateString(
                "en-IN",
                {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                }
              )}
            </strong>
          </div>
        </div>
      </div>

      {/* STATS */}
      <section className="dashboard-stats">

        <div className="stat-card stat-primary">
          <div className="stat-icon">
            <FiCalendar />
          </div>

          <div>
            <span>Appointments</span>
            <strong>{totalAppointments}</strong>
            <small>All scheduled appointments</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">
            <FiUsers />
          </div>

          <div>
            <span>Our Doctors</span>
            <strong>{doctorCount}</strong>
            <small>Doctors currently registered</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon pending-icon">
            <FiClock />
          </div>

          <div>
            <span>Pending</span>
            <strong>{pendingAppointments}</strong>
            <small>Awaiting confirmation</small>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon success-icon">
            <FiActivity />
          </div>

          <div>
            <span>Confirmed</span>
            <strong>{acceptedAppointments}</strong>
            <small>Confirmed appointments</small>
          </div>
        </div>

      </section>

      {/* APPOINTMENTS */}
      <section className="appointments-panel">

        <div className="panel-header">

          <div>
            <span className="panel-eyebrow">
              MEDICARE APPOINTMENTS
            </span>

            <h2>Appointments</h2>
          </div>

          <span className="appointment-count">
            {totalAppointments}{" "}
            {totalAppointments === 1
              ? "appointment"
              : "appointments"}
          </span>

        </div>

        {appointments.length > 0 ? (

          <div className="appointments-table-wrapper">

            <table className="modern-appointments-table">

              <thead>
                <tr>
                  <th>Patient</th>
                  <th>Date</th>
                  <th>Doctor</th>
                  <th>Department</th>
                  <th>Status</th>
                  <th>Visited</th>
                </tr>
              </thead>

              <tbody>

                {appointments.map((appointment) => (

                  <tr key={appointment._id}>

                    <td>
                      <div className="patient-cell">

                        <div className="patient-avatar">
                          {appointment.firstName?.charAt(0) ||
                            "P"}
                        </div>

                        <div>
                          <strong>
                            {appointment.firstName}{" "}
                            {appointment.lastName}
                          </strong>

                          <span>Patient</span>
                        </div>

                      </div>
                    </td>

                    <td>
                      <span className="date-cell">
                        {new Date(
                          appointment.appointment_date
                        ).toLocaleDateString(
                          "en-IN",
                          {
                            day: "numeric",
                            month: "short",
                            year: "numeric",
                          }
                        )}
                      </span>
                    </td>

                    <td>
                      <strong>
                        Dr.{" "}
                        {appointment.doctor?.firstName}{" "}
                        {appointment.doctor?.lastName}
                      </strong>
                    </td>

                    <td>
                      <span className="department-badge">
                        {appointment.department}
                      </span>
                    </td>

                    <td>
                      <select
                        className={`status-select ${
                          appointment.status === "Pending"
                            ? "status-pending"
                            : appointment.status ===
                              "Accepted"
                            ? "status-accepted"
                            : "status-rejected"
                        }`}
                        value={appointment.status}
                        onChange={(e) =>
                          handleUpdateStatus(
                            appointment._id,
                            e.target.value
                          )
                        }
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Accepted">
                          Confirmed
                        </option>

                        <option value="Rejected">
                          Rejected
                        </option>
                      </select>
                    </td>

                    <td>
                      {appointment.hasVisited ? (
                        <FiCheckCircle className="visited-yes" />
                      ) : (
                        <FiXCircle className="visited-no" />
                      )}
                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        ) : (

          <div className="empty-dashboard">

            <div>
              <FiAlertCircle />
            </div>

            <h3>No Appointments Yet</h3>

            <p>
              Appointments will appear here when patients
              book a visit with a MediCare doctor.
            </p>

          </div>

        )}

      </section>

    </main>
  );
};

export default Dashboard;