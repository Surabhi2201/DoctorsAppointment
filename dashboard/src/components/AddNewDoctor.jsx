import React, { useContext, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Context } from "../main";
import api from "../services/api";

const AddNewDoctor = () => {
  const { isAuthenticated, setIsAuthenticated } = useContext(Context);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [nic, setNic] = useState("");
  const [dob, setDob] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [doctorDepartment, setDoctorDepartment] = useState("");
  const [docAvatar, setDocAvatar] = useState("");
  const [docAvatarPreview, setDocAvatarPreview] = useState("");

  const navigateTo = useNavigate();

  const departmentsArray = [
    "Pediatrics",
    "Orthopedics",
    "Cardiology",
    "Neurology",
    "Oncology",
    "Radiology",
    "Physical Therapy",
    "Dermatology",
    "ENT",
  ];

  const handleAvatar = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setDocAvatarPreview(reader.result);
      setDocAvatar(file);
    };
  };

  const handleAddNewDoctor = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("firstName", firstName);
      formData.append("lastName", lastName);
      formData.append("email", email);
      formData.append("phone", phone);
      formData.append("password", password);
      formData.append("nic", nic);
      formData.append("dob", dob);
      formData.append("gender", gender);
      formData.append("doctorDepartment", doctorDepartment);
      formData.append("docAvatar", docAvatar);
      await api
        .post("/api/v1/user/doctor/addnew", formData, {
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
        })
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
  <main className="admin-main add-doctor-page">

    {/* HEADER */}
    <div className="add-doctor-page-header">
      <div>
        <span className="dashboard-eyebrow">
          MEDICARE
        </span>

        <h1>Register a New Doctor</h1>

        <p>
          Add a doctor to your MediCare healthcare team.
        </p>
      </div>

      <button
        type="button"
        className="add-doctor-back"
        onClick={() => navigateTo("/doctors")}
      >
        ← Back to Doctors
      </button>
    </div>

    {/* FORM CARD */}
    <section className="add-doctor-card">

      <div className="add-doctor-card-header">
        <div>
          <h2>Doctor Information</h2>
          <p>
            Enter the doctor's professional and personal details.
          </p>
        </div>
      </div>

      <form
        onSubmit={handleAddNewDoctor}
        className="add-doctor-form-modern"
      >

        {/* AVATAR */}
        <div className="doctor-avatar-section">

          <div className="doctor-upload-preview">
            <img
              src={
                docAvatarPreview
                  ? docAvatarPreview
                  : "/docHolder.jpg"
              }
              alt="Doctor Avatar"
            />
          </div>

          <div className="doctor-upload-info">
            <h3>Doctor Photo</h3>

            <p>
              Upload a clear profile photo for the doctor.
            </p>

            <label className="doctor-upload-button">
              Choose Photo
              <input
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatar}
              />
            </label>

            <span>
              PNG, JPG or WEBP
            </span>
          </div>

        </div>

        {/* PERSONAL DETAILS */}
        <div className="form-section-heading">
          <h3>Personal Details</h3>
          <span>Basic information</span>
        </div>

        <div className="doctor-form-grid">

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
              placeholder="doctor@example.com"
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

          <div className="form-field">
            <label>Department</label>
            <select
              value={doctorDepartment}
              onChange={(e) =>
                setDoctorDepartment(e.target.value)
              }
            >
              <option value="">
                Select Department
              </option>

              {departmentsArray.map(
                (depart, index) => (
                  <option
                    value={depart}
                    key={index}
                  >
                    {depart}
                  </option>
                )
              )}
            </select>
          </div>

        </div>

        {/* ACCOUNT */}
        <div className="form-section-heading">
          <h3>Account Setup</h3>
          <span>Login credentials</span>
        </div>

        <div className="doctor-form-grid single-field">
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

        {/* SUBMIT */}
        <div className="add-doctor-form-footer">

          <button
            type="button"
            className="add-doctor-cancel"
            onClick={() => navigateTo("/doctors")}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="add-doctor-submit"
          >
            Register New Doctor
          </button>

        </div>

      </form>

    </section>

  </main>
);
};

export default AddNewDoctor;
