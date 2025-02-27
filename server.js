const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

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

require("dotenv").config();
mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log("✅ Connected to MongoDB Atlas"))
    .catch((error) => console.error("❌ MongoDB Connection Error:", error));

const User = mongoose.model("user", userSchema);

app.get("/", async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
        ${allDbUsers
            .map((user) => `<li>${user.name} - ${user.email}</li>`)
            .join("")}
    </ul>`;
    res.send(html);
});

app.post("/", async (req, res) => {
    const /*{name, email, phone, college, semester}*/ body = req.body;

    const result = await User.create({
        name: body.name,
        email: body.email,
        phone: body.phone,
        college: body.college,
        semester: body.semester,
    });

    console.log(result);
    res.status(201).json(result);
});

app.route("/:id")
    .get(async (req, res) => {
        const user = await User.findById(req.params.id);
        res.send(user);
    })
    .delete(async (req, res) => {
        const user = await User.findByIdAndDelete(req.params.id);
        console.log("Deleted");
        res.send(`Deleted user with id ${req.params.id}`);
    });

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
