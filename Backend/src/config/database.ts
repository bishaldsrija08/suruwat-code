import envConfig = require("./envConfig");

import mongoose = require("mongoose");

const connectDB = async (): Promise<void> => {
    await mongoose.connect(envConfig.MONGODB_URI);
    console.log("Database connected successfully.");
};

export = connectDB;