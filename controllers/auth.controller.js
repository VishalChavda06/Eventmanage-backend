const User = require("../models/user.model");

// create user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // create new user
    const user = await User.create({
      name,
      email,
      password,
    });
    res
      .status(201)
      .json({ message: "User registered successfully", user, data: user });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

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
    if (user.password !== password) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      data: user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
};
