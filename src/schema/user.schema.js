const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    mail: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    admin: { type: Boolean, default: false },
});

module.exports = mongoose.model("users", userSchema);
