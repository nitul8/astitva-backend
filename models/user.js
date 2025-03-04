const mongoose = require("mongoose");
const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        college: {
            type: String,
            required: true,
        },
        semester: {
            type: String,
        },
    },
    {timestamps: true}
);

const User = mongoose.model("user", userSchema);
module.exports = User;
