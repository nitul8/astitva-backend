const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;
const dataFilePath = path.join(__dirname, "drives.json");

// CORS Configuration (Allow only specific origins)
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*", // Replace with your frontend URL in production
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

// Ensure drives.json file exists
if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, JSON.stringify([], null, 4));
}

// GET Route - Fetch all data
app.get("/", (req, res) => {
    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));
        res.json(data);
    } catch (error) {
        console.error("Error reading file:", error);
        res.status(500).json({error: "Server error while reading data."});
    }
});

// POST Route - Add a new user
app.post("/", (req, res) => {
    const {name, email, phone, college, semester} = req.body;

    if (!name || !email || !phone || !college || !semester) {
        return res.status(400).json({error: "All fields are required"});
    }

    try {
        const data = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

        const newUser = {
            id: data.length + 1, // Generate unique ID
            fullName: name,
            email,
            phone,
            college,
            semester,
        };

        data.push(newUser);
        fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 4));

        res.status(201).json({
            message: "Registration successful!",
            user: newUser,
        });
    } catch (error) {
        console.error("Error writing to file:", error);
        res.status(500).json({error: "Server error while saving data."});
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
