const express = require("express");
const cors = require("cors");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const UserPasskey = require("./model/userpasskey");
const Contact = require("./schema");

const app = express();
app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/ASAB")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// SIGNUP
app.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const existingUser = await UserPasskey.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UserPasskey({ email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ message: "Signup Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Signup Failed" });
  }
});

// USER CONTACT SUBMISSION
app.post("/userlist", async (req, res) => {
  try {
    const { name, email, phonenumber, message } = req.body;

    if (!name || !email || !phonenumber || !message) {
      return res.status(400).json({ message: "All contact fields are required" });
    }

    const newContact = new Contact({ name, email, phonenumber, message });
    await newContact.save();

    res.status(201).json({ message: "Contact submission saved" });
  } catch (error) {
    console.log("Contact save error:", error);
    res.status(500).json({ message: "Contact save failed" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password required" });
    }

    const user = await UserPasskey.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    res.status(200).json({ message: "Login Successful" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Login Failed" });
  }
});

// GET all signed-up users (excluding password)
app.get("/api/users", async (req, res) => {
  try {
    const users = await UserPasskey.find({}, { password: 0 });
    res.status(200).json(users);
  } catch (error) {
    console.log("Fetch users error:", error);
    res.status(500).json({ message: "Failed to fetch users" });
  }
});

// GET all contact form submissions
app.get("/api/contacts", async (req, res) => {
  try {
    const contacts = await Contact.find();
    res.status(200).json(contacts);
  } catch (error) {
    console.log("Fetch contacts error:", error);
    res.status(500).json({ message: "Failed to fetch contacts" });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));