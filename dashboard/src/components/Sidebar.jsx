import React, { useContext, useState } from "react";
import {
  FiHome,
  FiUsers,
  FiUserPlus,
  FiShield,
  FiMessageSquare,
  FiLogOut,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import {
  useLocation,
  useNavigate,
} from "react-router-dom";

import { toast } from "react-toastify";

import { Context } from "../main";
import api from "../services/api";

const Sidebar = ({ collapsed, setCollapsed }) => {
  const [show, setShow] = useState(false);

  const {
    isAuthenticated,
    setIsAuthenticated,
    admin,
  } = useContext(Context);

  const navigateTo = useNavigate();
  const location = useLocation();

  const closeMobileMenu = () => {
    setShow(false);
  };

  const handleNavigation = (path) => {
    navigateTo(path);
    closeMobileMenu();
  };

  const handleLogout = async () => {
    try {
      const { data } = await api.get(
        "/api/v1/user/admin/logout",
        {
          withCredentials: true,
        }
      );

      toast.success(data.message);

      setIsAuthenticated(false);
      navigateTo("/login");
      closeMobileMenu();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Unable to logout."
      );
    }
  };

  const navItems = [
    {
      label: "Overview",
      icon: <FiHome />,
      path: "/",
    },
    {
      label: "Doctors",
      icon: <FiUsers />,
      path: "/doctors",
    },
    {
      label: "Add Doctor",
      icon: <FiUserPlus />,
      path: "/doctor/addnew",
    },
    {
      label: "Add Admin",
      icon: <FiShield />,
      path: "/admin/addnew",
    },
    {
      label: "Messages",
      icon: <FiMessageSquare />,
      path: "/messages",
    },
  ];

  if (!isAuthenticated) {
    return null;
  }

  return (
    <>
      <aside
        className={`admin-sidebar ${
          collapsed
            ? "admin-sidebar-collapsed"
            : ""
        } ${
          show
            ? "admin-sidebar-open"
            : ""
        }`}
      >
        {/* BRAND */}
        <div className="sidebar-brand">
          <img
            src="/logo.png"
            alt="MediCare"
          />

          {!collapsed && (
            <div>
              <strong>MediCare</strong>
              <span>Admin Portal</span>
            </div>
          )}
        </div>

        {/* COLLAPSE BUTTON */}
        <button
          type="button"
          className="sidebar-collapse-icon"
          onClick={() =>
            setCollapsed(!collapsed)
          }
          aria-label={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
          title={
            collapsed
              ? "Expand sidebar"
              : "Collapse sidebar"
          }
        >
          {collapsed ? (
            <FiChevronRight />
          ) : (
            <FiChevronLeft />
          )}
        </button>

        {/* ADMIN PROFILE */}
        <div className="sidebar-admin">
          <div className="admin-avatar">
            {admin?.firstName
              ?.charAt(0)
              ?.toUpperCase() || "A"}
          </div>

          {!collapsed && (
            <div>
              <span>Administrator</span>

              <strong>
                {admin?.firstName ||
                  "Admin"}{" "}
                {admin?.lastName || ""}
              </strong>
            </div>
          )}
        </div>

        {/* NAVIGATION */}
        <nav className="sidebar-nav">
          <span className="sidebar-section-title">
            MAIN
          </span>

          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path;

            return (
              <button
                key={item.path}
                type="button"
                className={`sidebar-nav-item ${
                  isActive ? "active" : ""
                }`}
                onClick={() =>
                  handleNavigation(item.path)
                }
                title={
                  collapsed
                    ? item.label
                    : undefined
                }
              >
                <span className="sidebar-nav-icon">
                  {item.icon}
                </span>

                {!collapsed && (
                  <span className="sidebar-nav-label">
                    {item.label}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* BOTTOM */}
        <div className="sidebar-bottom">
          <button
            type="button"
            className="sidebar-logout"
            onClick={handleLogout}
            title={
              collapsed
                ? "Logout"
                : undefined
            }
          >
            <FiLogOut />

            {!collapsed && (
              <span>Logout</span>
            )}
          </button>

          {!collapsed && (
            <div className="sidebar-footer">
              <span>© 2026 MediCare</span>
            </div>
          )}
        </div>
      </aside>

      {/* MOBILE MENU BUTTON */}
      <button
        type="button"
        className="sidebar-mobile-toggle"
        onClick={() => setShow(!show)}
        aria-label={
          show
            ? "Close navigation"
            : "Open navigation"
        }
      >
        {show ? <FiX /> : <FiMenu />}
      </button>

      {/* MOBILE OVERLAY */}
      {show && (
        <div
          className="sidebar-overlay"
          onClick={closeMobileMenu}
        />
      )}
    </>
  );
};

export default Sidebar;