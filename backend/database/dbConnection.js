import mongoose from "mongoose";

export const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      dbName: "doctors_appointment",
    });

    console.log("Connected to database!");
  } catch (error) {
    console.error("Database connection failed:", error.message);
    process.exit(1);
  }
};