const mongoose = require("mongoose");

const connectMongodb = (url) => {
    return mongoose
        .connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log("✅ MongoDB Connected"))
        .catch((error) => {
            console.error("❌ MongoDB Connection Error:", error.message);
            process.exit(1);
        });
};

module.exports = {connectMongodb};
