const express = require("express");
const router = express.Router();
const User = require("./user");
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const newUser = new User({
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({
      message: "Signup Successful",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

module.exports = router;