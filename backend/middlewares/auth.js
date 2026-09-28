import { User } from "../models/userSchema.js";
import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./error.js";
import jwt from "jsonwebtoken";

// ======================================================
// HELPER FUNCTION
// ======================================================

const authenticateUser = async (token, expectedRole, next) => {
  if (!token) {
    return next(
      new ErrorHandler("User is not authenticated!", 401)
    );
  }

  let decoded;

  try {
    decoded = jwt.verify(
      token,
      process.env.JWT_SECRET_KEY
    );
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired authentication token!", 401)
    );
  }

  const user = await User.findById(decoded.id);

  if (!user) {
    return next(
      new ErrorHandler("User account no longer exists!", 401)
    );
  }

  if (user.role !== expectedRole) {
    return next(
      new ErrorHandler(
        `${user.role} is not authorized for this resource!`,
        403
      )
    );
  }

  return user;
};


// ======================================================
// ADMIN AUTHENTICATION
// ======================================================

export const isAdminAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.adminToken;

    const user = await authenticateUser(
      token,
      "Admin",
      next
    );

    if (!user) return;

    req.user = user;

    next();
  }
);


// ======================================================
// PATIENT AUTHENTICATION
// ======================================================

export const isPatientAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.patientToken;

    const user = await authenticateUser(
      token,
      "Patient",
      next
    );

    if (!user) return;

    req.user = user;

    next();
  }
);


// ======================================================
// DOCTOR AUTHENTICATION
// ======================================================

export const isDoctorAuthenticated = catchAsyncErrors(
  async (req, res, next) => {
    const token = req.cookies.doctorToken;

    const user = await authenticateUser(
      token,
      "Doctor",
      next
    );

    if (!user) return;

    req.user = user;

    next();
  }
);


// ======================================================
// ROLE-BASED AUTHORIZATION
// ======================================================

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(
        new ErrorHandler(
          "User is not authenticated!",
          401
        )
      );
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `${req.user.role} is not allowed to access this resource!`,
          403
        )
      );
    }

    next();
  };
};