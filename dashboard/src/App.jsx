import React, { useContext, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import AddNewDoctor from "./components/AddNewDoctor";
import Messages from "./components/Messages";
import Doctors from "./components/Doctors";
import AddNewAdmin from "./components/AddNewAdmin";
import Sidebar from "./components/Sidebar";

import { Context } from "./main";
import api from "./services/api";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

const App = () => {
  const {
    isAuthenticated,
    setIsAuthenticated,
    setAdmin,
  } = useContext(Context);

  // Controls sidebar collapsed/expanded state
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get(
          "/api/v1/user/admin/me",
          {
            withCredentials: true,
          }
        );

        setIsAuthenticated(true);
        setAdmin(response.data.user);
      } catch (error) {
        setIsAuthenticated(false);
        setAdmin({});
      }
    };

    fetchUser();
  }, [isAuthenticated, setAdmin, setIsAuthenticated]);

  return (
  <Router>
  <Sidebar
    collapsed={sidebarCollapsed}
    setCollapsed={setSidebarCollapsed}
  />

 <main
  className={`admin-content ${
    !isAuthenticated
      ? "admin-content-public"
      : sidebarCollapsed
      ? "admin-content-collapsed"
      : ""
  }`}
>
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/login" element={<Login />} />
      <Route path="/doctor/addnew" element={<AddNewDoctor />} />
      <Route path="/admin/addnew" element={<AddNewAdmin />} />
      <Route path="/messages" element={<Messages />} />
      <Route path="/doctors" element={<Doctors />} />
    </Routes>
  </main>

  <ToastContainer position="top-center" />
</Router>
  );
};

export default App;