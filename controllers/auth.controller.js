const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("../config/cloudinary");

const JWT_SECRET = process.env.JWT_SECRET || "change_this_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

// helper to remove sensitive fields
const sanitizeUser = (userDoc) => {
  const user = userDoc.toObject ? userDoc.toObject() : { ...userDoc };
  delete user.password;
  return user;
};

// create user
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // validate allowed roles
    const allowedRoles = ["admin", "organizer", "user"];
    const assignedRole = allowedRoles.includes(role) ? role : "user";

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // create new user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: assignedRole,
    });

    // create jwt
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(201).json({
      message: "User registered successfully",
      data: sanitizeUser(user),
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Missing credentials" });
    }

    // find user
    const user = await User.findOne({ email });

    // check user exists
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid password" });
    }

    // create jwt
    const token = jwt.sign({ id: user._id, role: user.role }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: sanitizeUser(user),
      token,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// get user profile (protected)
const getProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });
    return res.status(200).json({ success: true, data: sanitizeUser(req.user) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// update user profile (protected)
const updateProfile = async (req, res) => {
  try {
    if (!req.user) return res.status(401).json({ success: false, message: "Unauthorized" });

    const allowed = ["name", "profileImage", "phone"];
    const updates = {};

    if (req.body.profileImage !== undefined) {
      if (typeof req.body.profileImage === "string" && req.body.profileImage.startsWith("data:")) {
        const uploadResult = await cloudinary.uploader.upload(req.body.profileImage, {
          folder: process.env.CLOUDINARY_FOLDER || "event-management",
          resource_type: "image",
        });
        updates.profileImage = uploadResult.secure_url;
      } else {
        updates.profileImage = req.body.profileImage;
      }
    }

    allowed.forEach((field) => {
      if (field !== "profileImage" && req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const updated = await User.findByIdAndUpdate(req.user._id, updates, { new: true }).select("-password");
    return res.status(200).json({ success: true, data: sanitizeUser(updated) });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
  registerUser,
  loginUser,
  getProfile,
  updateProfile,
};

