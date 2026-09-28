import React, { useContext, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  FiMenu,
  FiX,
  FiLogIn,
  FiLogOut,
  FiCalendar,
} from "react-icons/fi";
import { toast } from "react-toastify";

import { Context } from "../main";
import api from "../services/api";

const Navbar = () => {
  const [show, setShow] = useState(false);

  const {
    isAuthenticated,
    setIsAuthenticated,
  } = useContext(Context);

  const navigateTo = useNavigate();
  const location = useLocation();

  const closeMenu = () => {
    setShow(false);
  };

  const handleLogout = async () => {
    try {
      const { data } = await api.get(
        "/api/v1/user/patient/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setIsAuthenticated(false);

      navigateTo("/");

      closeMenu();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to logout."
      );
    }
  };

  const isActive = (path) =>
    location.pathname === path;

  return (
    <header className="site-header">

      <nav className="navbar container">

        {/* BRAND */}

       <Link
  to="/"
  className="brand"
  onClick={closeMenu}
>
  <img
    src="/img1.png"
    alt="MediCare"
    className="brand-logo"
  />
</Link>

        {/* NAVIGATION */}

        <div
          className={`nav-menu ${
            show ? "nav-menu-open" : ""
          }`}
        >

          <div className="nav-links">

            <Link
              to="/"
              className={
                isActive("/")
                  ? "nav-link-active"
                  : ""
              }
              onClick={closeMenu}
            >
              Home
            </Link>

         <Link
  to="/my-appointment"
  className={
    isActive("/my-appointment")
      ? "nav-link-active"
      : ""
  }
  onClick={closeMenu}
>
  Appointments
</Link>

            <Link
              to="/about"
              className={
                isActive("/about")
                  ? "nav-link-active"
                  : ""
              }
              onClick={closeMenu}
            >
              About
            </Link>
 <Link
    to="/contact"
    className={isActive("/contact") ? "nav-link-active" : ""}
    onClick={closeMenu}
  >
    Contact
  </Link>
          </div>

          {/* ACTIONS */}

          <div className="nav-actions">

            {isAuthenticated ? (
              <button
                type="button"
                className="nav-login-btn"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            ) : (
              <button
                type="button"
                className="nav-login-btn"
                onClick={() => {
                  navigateTo("/login");
                  closeMenu();
                }}
              >
                <FiLogIn />
                Login
              </button>
            )}

            <Link
              to="/appointment"
              className="nav-cta"
              onClick={closeMenu}
            >
              <FiCalendar />
              Book Appointment
            </Link>

          </div>

        </div>

        {/* MOBILE BUTTON */}

        <button
          type="button"
          className="mobile-menu-btn"
          onClick={() => setShow(!show)}
          aria-label={
            show
              ? "Close navigation"
              : "Open navigation"
          }
        >
          {show ? <FiX /> : <FiMenu />}
        </button>

      </nav>

    </header>
  );
};

export default Navbar;