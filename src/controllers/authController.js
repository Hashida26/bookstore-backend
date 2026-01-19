const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/generateToken");

/* ================= REGISTER ================= */
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1️⃣ Validate input
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    // 2️⃣ Check if user already exists
    const existingUser = await User.findOne({
      email: email.toLowerCase(),
    });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    // 3️⃣ Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4️⃣ Create user
    await User.create({
      name,
      email: email.toLowerCase(),
      password: hashedPassword,
      role: "user",
    });

    // 5️⃣ Send response
    return res.status(201).json({
      message: "User registered successfully",
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= LOGIN ================= */
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("LOGIN EMAIL:", email);

    const user = await User.findOne({ email: email.toLowerCase() });
    console.log("USER FOUND:", user);

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    console.log("USER PASSWORD FROM DB:", user.password);
    console.log("TYPE OF PASSWORD:", typeof user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("PASSWORD MATCH:", isMatch);

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    return res.status(200).json({
  accessToken,
  refreshToken,
  role: user.role,
  name: user.name,
  email: user.email,
});


  } catch (error) {
    console.error("LOGIN CRASH ERROR 👉", error);
    return res.status(500).json({ message: "Server error" });
  }
};

/* ================= REFRESH TOKEN ================= */
exports.refreshToken = (req, res) => {
  const { refreshToken } = req.body;

  if (!refreshToken) {
    return res.status(401).json({
      message: "Refresh token missing",
    });
  }

  jwt.verify(
    refreshToken,
    process.env.JWT_REFRESH_SECRET,
    (err, decoded) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid refresh token",
        });
      }

      const newAccessToken = generateAccessToken(decoded);

      return res.status(200).json({
        accessToken: newAccessToken,
      });
    }
  );
};
