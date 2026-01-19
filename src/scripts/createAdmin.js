require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

mongoose.connect(process.env.DB_URI);

async function createAdmin() {
  const exists = await User.findOne({ role: "admin" });

  if (exists) {
    console.log("Admin already exists");
    process.exit();
  }

  const hashedPassword = await bcrypt.hash("admin123", 10);

  await User.create({
    name: "Bookstore Admin",
    email: "admin@bookstore.com",
    password: hashedPassword, // ✅ HASHED
    role: "admin",
  });

  console.log("Admin created successfully");
  process.exit();
}

createAdmin();
