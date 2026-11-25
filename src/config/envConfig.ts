import dotenv = require("dotenv");

dotenv.config();

// Validate and export environment variables
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error("MONGODB_URI is required.");
}

// Validate PORT
const port = Number(process.env.PORT ?? "3000");
if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("PORT must be an integer between 1 and 65535.");
}

const envConfig = {
    PORT: port,
    MONGODB_URI: mongoUri,
};

export = envConfig;