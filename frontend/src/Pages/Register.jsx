import api from "../services/api";
import React, { useContext, useState } from "react";
import { toast } from "react-toastify";
import { Context } from "../main";
import {
  Link,
  Navigate,
  useNavigate,
} from "react-router-dom";
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiCalendar,
  FiArrowRight,
  FiHeart,
} from "react-icons/fi";

const Register = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleRegistration = async (e) => {
    e.preventDefault();

    try {
      const { data } = await api.post(
        "/api/v1/user/patient/register",
        {
          firstName,
          lastName,
          email,
          phone,
          nic,
          dob,
          gender,
          password,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      toast.success(data.message);

      setIsAuthenticated(true);

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setNic("");
      setDob("");
      setGender("");
      setPassword("");

      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to create your account."
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <main className="medicare-register-page">

      {/* LEFT SIDE */}

      <section className="register-visual">

        <div className="register-visual-content">

          <div className="register-brand">
            <img
              src="/logo.png"
              alt="MediCare"
            />

            <span>MediCare</span>
          </div>

          <div className="register-message">

            <span className="register-badge">
              <FiHeart />
              Welcome to MediCare
            </span>

            <h1>
              Start your
              <br />
              <span>health journey.</span>
            </h1>

            <p>
              Create your MediCare account and
              get a simpler way to connect with
              healthcare professionals.
            </p>

          </div>

          <div className="register-benefits">

            <div>
              <strong>Find Your Doctor</strong>
              <span>
                Explore healthcare specialists
              </span>
            </div>

            <div>
              <strong>Book Appointments</strong>
              <span>
                Schedule care when you need it
              </span>
            </div>

          </div>

        </div>

        <div className="register-decoration register-decoration-one" />
        <div className="register-decoration register-decoration-two" />

      </section>

      {/* RIGHT SIDE */}

      <section className="register-form-section">

        <div className="register-form-wrapper">

          <div className="register-mobile-brand">
            <img
              src="/logo.png"
              alt="MediCare"
            />

            <span>MediCare</span>
          </div>

          <div className="register-heading">

            <span>CREATE ACCOUNT</span>

            <h2>Create your MediCare account</h2>

            <p>
              Enter your details to get started
              with MediCare.
            </p>

          </div>

          <form
            className="medicare-register-form"
            onSubmit={handleRegistration}
          >

            {/* NAME */}

            <div className="register-grid">

              <div className="register-field">
                <label>First Name</label>

                <div className="register-input">
                  <FiUser />

                  <input
                    type="text"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) =>
                      setFirstName(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Last Name</label>

                <div className="register-input">
                  <FiUser />

                  <input
                    type="text"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) =>
                      setLastName(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

            </div>

            {/* CONTACT */}

            <div className="register-grid">

              <div className="register-field">
                <label>Email Address</label>

                <div className="register-input">
                  <FiMail />

                  <input
                    type="email"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Mobile Number</label>

                <div className="register-input">
                  <FiPhone />

                  <input
                    type="tel"
                    placeholder="Mobile number"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

            </div>

            {/* PERSONAL DETAILS */}

            <div className="register-grid">

              <div className="register-field">
                <label>NIC</label>

                <div className="register-input">
                  <FiUser />

                  <input
                    type="text"
                    placeholder="Enter NIC"
                    value={nic}
                    onChange={(e) =>
                      setNic(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="register-field">
                <label>Date of Birth</label>

                <div className="register-input">
                  <FiCalendar />

                  <input
                    type="date"
                    value={dob}
                    onChange={(e) =>
                      setDob(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

            </div>

            {/* GENDER + PASSWORD */}

            <div className="register-grid">

              <div className="register-field">
                <label>Gender</label>

                <select
                  value={gender}
                  onChange={(e) =>
                    setGender(e.target.value)
                  }
                  required
                >
                  <option value="">
                    Select Gender
                  </option>

                  <option value="Male">
                    Male
                  </option>

                  <option value="Female">
                    Female
                  </option>
                </select>
              </div>

              <div className="register-field">
                <label>Password</label>

                <div className="register-input">
                  <FiLock />

                  <input
                    type="password"
                    placeholder="Create a password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                  />
                </div>
              </div>

            </div>

            {/* SUBMIT */}

            <button
              type="submit"
              className="register-submit"
            >
              Create Account
              <FiArrowRight />
            </button>

          </form>

          {/* LOGIN */}

          <div className="register-login">

            <span>
              Already have a MediCare account?
            </span>

            <Link to="/login">
              Sign in
            </Link>

          </div>

          <div className="register-footer">
            <span>
              © 2026 MediCare · Your health matters
            </span>
          </div>

        </div>

      </section>

    </main>
  );
};

export default Register;