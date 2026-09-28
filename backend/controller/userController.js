import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { generateToken } from "../utils/jwtToken.js";
import cloudinary from "cloudinary";
import {config} from "dotenv";
// ======================================================
// PATIENT REGISTRATION
// ======================================================
config();
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
console.log("Cloudinary configured:", {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY ? "FOUND" : "MISSING",
  api_secret: process.env.CLOUDINARY_API_SECRET ? "FOUND" : "MISSING",
});
export const patientRegister = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
  } = req.body;

  // Check required fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(
      new ErrorHandler("Please fill all required fields!", 400)
    );
  }

  // Check whether user already exists
  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler("User already registered with this email!", 400)
    );
  }

  // Create patient
  const user = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Patient",
  });

  // Generate JWT + patient cookie
  generateToken(user, "Patient registered successfully!", 201, res);
});


// ======================================================
// LOGIN
// ======================================================

export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;

  // Check required fields
  if (!email || !password || !role) {
    return next(
      new ErrorHandler("Please enter email, password and role!", 400)
    );
  }

  // Find user
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(
      new ErrorHandler("Invalid email or password!", 401)
    );
  }

  // Check password
  const isPasswordMatch = await user.comparePassword(password);

  if (!isPasswordMatch) {
    return next(
      new ErrorHandler("Invalid email or password!", 401)
    );
  }

  // Check selected role
  if (role !== user.role) {
    return next(
      new ErrorHandler("This account does not have this role!", 403)
    );
  }

  // Generate JWT + appropriate cookie
  generateToken(user, "Login successful!", 200, res);
});


// ======================================================
// ADD NEW ADMIN
// ======================================================

export const addNewAdmin = catchAsyncErrors(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
  } = req.body;

  // Validate fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password
  ) {
    return next(
      new ErrorHandler("Please fill all required fields!", 400)
    );
  }

  // Check existing account
  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        "An account with this email already exists!",
        400
      )
    );
  }

  // Create admin
  const admin = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Admin",
  });

  res.status(201).json({
    success: true,
    message: "New admin registered successfully!",
    admin,
  });
});


// ======================================================
// ADD NEW DOCTOR
// ======================================================

export const addNewDoctor = catchAsyncErrors(async (req, res, next) => {
  // Check doctor avatar
  if (!req.files || Object.keys(req.files).length === 0) {
    return next(
      new ErrorHandler("Doctor avatar is required!", 400)
    );
  }

  const { docAvatar } = req.files;

  // Validate image format
  const allowedFormats = [
    "image/png",
    "image/jpeg",
    "image/webp",
  ];

  if (!allowedFormats.includes(docAvatar.mimetype)) {
    return next(
      new ErrorHandler(
        "Unsupported image format. Please upload PNG, JPEG or WEBP.",
        400
      )
    );
  }

  const {
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    doctorDepartment,
  } = req.body;

  // Validate fields
  if (
    !firstName ||
    !lastName ||
    !email ||
    !phone ||
    !nic ||
    !dob ||
    !gender ||
    !password ||
    !doctorDepartment
  ) {
    return next(
      new ErrorHandler("Please fill all required fields!", 400)
    );
  }

  // Check existing account
  const isRegistered = await User.findOne({ email });

  if (isRegistered) {
    return next(
      new ErrorHandler(
        "A doctor with this email already exists!",
        400
      )
    );
  }

  // Upload avatar to Cloudinary
 const cloudinaryResponse = await cloudinary.uploader.upload(
  docAvatar.tempFilePath,
  {
    folder: "medicare/doctors",
  }
);

  if (!cloudinaryResponse || cloudinaryResponse.error) {
    console.error(
      "Cloudinary Error:",
      cloudinaryResponse?.error || "Unknown Cloudinary error"
    );

    return next(
      new ErrorHandler(
        "Failed to upload doctor avatar.",
        500
      )
    );
  }

  // Create doctor
  const doctor = await User.create({
    firstName,
    lastName,
    email,
    phone,
    nic,
    dob,
    gender,
    password,
    role: "Doctor",
    doctorDepartment,
    docAvatar: {
      public_id: cloudinaryResponse.public_id,
      url: cloudinaryResponse.secure_url,
    },
  });

  res.status(201).json({
    success: true,
    message: "Doctor registered successfully!",
    doctor,
  });
});


// ======================================================
// GET ALL DOCTORS
// ======================================================

export const getAllDoctors = catchAsyncErrors(
  async (req, res, next) => {
    const doctors = await User.find({ role: "Doctor" });

    res.status(200).json({
      success: true,
      doctors,
    });
  }
);


// ======================================================
// GET CURRENT USER DETAILS
// ======================================================

export const getUserDetails = catchAsyncErrors(
  async (req, res, next) => {
    const user = req.user;

    if (!user) {
      return next(
        new ErrorHandler("User not found!", 404)
      );
    }

    res.status(200).json({
      success: true,
      user,
    });
  }
);


// ======================================================
// ADMIN LOGOUT
// ======================================================

export const logoutAdmin = catchAsyncErrors(
  async (req, res, next) => {
    res
      .status(200)
      .cookie("adminToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Admin logged out successfully.",
      });
  }
);


// ======================================================
// PATIENT LOGOUT
// ======================================================

export const logoutPatient = catchAsyncErrors(
  async (req, res, next) => {
    res
      .status(200)
      .cookie("patientToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Patient logged out successfully.",
      });
  }
);


// ======================================================
// DOCTOR LOGOUT
// ======================================================

export const logoutDoctor = catchAsyncErrors(
  async (req, res, next) => {
    res
      .status(200)
      .cookie("doctorToken", "", {
        httpOnly: true,
        expires: new Date(0),
      })
      .json({
        success: true,
        message: "Doctor logged out successfully.",
      });
  }
);