const mongoose = require('mongoose');

module.exports = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("Database Connected");
    } catch (err) {
        console.error("DB connection error:", err);
        process.exit(1); // optional: exit on failure
    }
};