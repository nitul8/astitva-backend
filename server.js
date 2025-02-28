const express = require("express");
const cors = require("cors");
require("dotenv").config();

const {connectMongodb} = require("./connection");
const userRouter = require("./routes/user");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://astitvafoundation.vercel.app",
        ],
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

connectMongodb(process.env.MONGO_URI);

app.use(express.json());

app.use(userRouter);

app.listen(PORT, () => {
    console.log(`✅ Server running on http://localhost:${PORT}`);
});
