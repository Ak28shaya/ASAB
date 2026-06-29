const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phonenumber: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },
});

// Save contact submissions into the exact collection name "users"
module.exports = mongoose.model('Contact', userSchema, 'users');