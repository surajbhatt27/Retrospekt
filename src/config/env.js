import dotenv from "dotenv";

dotenv.config();

export const config = {
    mongoUri: process.env.MONGODB_URI,
    port: process.env.PORT || 8000,
    corsOrigin: process.env.CORS_ORIGIN,
}

if(!config.mongoUri) {
    console.log("MONGODB_URI is not set in environment variable");
}