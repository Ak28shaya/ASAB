const mongoose = require("mongoose");

mongoose
.connect("mongodb://localhost:27017/ASAB")
.then(() => {
    console.log("connection successful");
})
.catch((err) => {
    console.log("connection error:", err.message);
});