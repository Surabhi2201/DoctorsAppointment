import React, { useContext, useState } from "react";
import { Context } from "../main";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../services/api";

const AddNewAdmin = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");

  const navigateTo = useNavigate();

  const handleAddNewAdmin = async (e) => {
    e.preventDefault();
    try {
      await api
        .post(
          "/api/v1/user/admin/addnew",
          { firstName, lastName, email, phone, nic, dob, gender, password },
          {
            withCredentials: true,
            headers: { "Content-Type": "application/json" },
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          setIsAuthenticated(true);
          navigateTo("/");
          setFirstName("");
          setLastName("");
          setEmail("");
          setPhone("");
          setNic("");
          setDob("");
          setGender("");
          setPassword("");
        });
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  if (!isAuthenticated) {
    return <Navigate to={"/login"} />;
  }

  return (
  <main className="admin-main add-admin-page">

    {/* HEADER */}
    <div className="add-admin-page-header">
      <div>
        <span className="dashboard-eyebrow">
          MEDICARE
        </span>

        <h1>Add a New Administrator</h1>

        <p>
          Create an administrator account for the MediCare system.
        </p>
      </div>

      <button
        type="button"
        className="add-admin-back"
        onClick={() => navigateTo("/")}
      >
        ← Back to Overview
      </button>
    </div>

    {/* FORM CARD */}
    <section className="add-admin-card">

      <div className="add-admin-card-header">
        <div>
          <h2>Administrator Information</h2>

          <p>
            Enter the personal details and login credentials
            for the new administrator.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAddNewAdmin}
        className="add-admin-form-modern"
      >

        {/* PERSONAL DETAILS */}
        <div className="form-section-heading">
          <h3>Personal Details</h3>
          <span>Basic information</span>
        </div>

        <div className="admin-form-grid">

          <div className="form-field">
            <label>First Name</label>
            <input
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) =>
                setFirstName(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Last Name</label>
            <input
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) =>
                setLastName(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@example.com"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Mobile Number</label>
            <input
              type="tel"
              placeholder="Enter mobile number"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>NIC</label>
            <input
              type="text"
              placeholder="Enter NIC"
              value={nic}
              onChange={(e) =>
                setNic(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Date of Birth</label>
            <input
              type="date"
              value={dob}
              onChange={(e) =>
                setDob(e.target.value)
              }
            />
          </div>

          <div className="form-field">
            <label>Gender</label>
            <select
              value={gender}
              onChange={(e) =>
                setGender(e.target.value)
              }
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

        </div>

        {/* ACCOUNT */}
        <div className="form-section-heading">
          <h3>Account Setup</h3>
          <span>Login credentials</span>
        </div>

        <div className="admin-form-grid">

          <div className="form-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Create a secure password"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />
          </div>

        </div>

        {/* FOOTER */}
        <div className="add-admin-form-footer">

          <button
            type="button"
            className="add-admin-cancel"
            onClick={() => navigateTo("/")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-admin-submit"
          >
            Add New Admin
          </button>

        </div>

      </form>

    </section>

  </main>
);
};

export default AddNewAdmin;
