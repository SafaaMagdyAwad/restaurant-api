import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import User from "../models/User.mjs"; 

dotenv.config();

async function createAdmin() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected");

    const existing = await User.findOne({ email: "Safaaadmin@example.com" });
    if (existing) {
      console.log("Admin already exists!");
      return process.exit(0);
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new User({
      name: "Admin",
      email: "Safaaadmin@example.com",
      password: hashedPassword,
      role: "admin",
    });

    await admin.save();
    console.log("Admin user created successfully!");
    process.exit(0);

  } catch (err) {
    console.error("Error creating admin:", err);
    process.exit(1);
  }
}

createAdmin();