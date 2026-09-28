import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import {
  FiLock,
  FiMail,
  FiArrowRight,
  FiShield,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { Context } from "../main";
import api from "../services/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const {
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(Context);

  const navigateTo = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      const res = await api.post(
        "/api/v1/user/login",
        {
          email,
          password,
          role: "Admin",
        },
        {
          withCredentials: true,
        }
      );

      toast.success(res.data.message);

      setIsAuthenticated(true);

      setEmail("");
      setPassword("");

      navigateTo("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Login failed. Please try again."
      );
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <main className="medicare-admin-login">
      <div className="admin-login-decoration admin-login-decoration-one" />
      <div className="admin-login-decoration admin-login-decoration-two" />

      <section className="admin-login-card">
        <div className="admin-login-brand">
          <div className="admin-login-brand-mark">
            <span />
            <span />
          </div>

          <div>
            <strong>MediCare</strong>
            <span>Admin Portal</span>
          </div>
        </div>

        <div className="admin-login-icon">
          <FiShield />
        </div>

        <div className="admin-login-heading">
          <span>WELCOME BACK</span>

          <h1>Admin Login</h1>

          <p>
            Sign in to manage appointments, doctors,
            and your MediCare healthcare system.
          </p>
        </div>

        <form
          className="admin-login-form"
          onSubmit={handleLogin}
        >
          <div className="admin-login-field">
            <label htmlFor="admin-email">
              Email Address
            </label>

            <div className="admin-login-input">
              <FiMail />

              <input
                id="admin-email"
                type="email"
                placeholder="Enter your admin email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                autoComplete="email"
              />
            </div>
          </div>

          <div className="admin-login-field">
            <label htmlFor="admin-password">
              Password
            </label>

            <div className="admin-login-input">
              <FiLock />

              <input
                id="admin-password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                autoComplete="current-password"
              />
            </div>
          </div>

          <button
            type="submit"
            className="admin-login-submit"
          >
            <span>Sign In</span>
            <FiArrowRight />
          </button>
        </form>

        <div className="admin-login-security">
          <FiLock />

          <span>
            Secure administrator access
          </span>
        </div>
      </section>
    </main>
  );
};

export default Login;