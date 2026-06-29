const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// Third argument forces the exact collection name "user_passkey"
module.exports = mongoose.model("UserPasskey", userSchema, "user_passkey");