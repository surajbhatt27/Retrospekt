import dotenv from "dotenv";

dotenv.config();

export const config = {
    mongoUri: process.env.MONGODB_URI,
    port: process.env.PORT || 8000,
    corsOrigin: process.env.CORS_ORIGIN,
    accessTokenSecret: process.env.ACCESS_TOKEN_SECRET,
    accessTokenExpiry: process.env.ACCESS_TOKEN_EXPIRY,
    refreshTokenSecret: process.env.REFRESH_TOKEN_SECRET,
    refreshTokenExpiry: process.env.REFRESH_TOKEN_EXPIRY
}

if(!config.mongoUri) {
    console.log("MONGODB_URI is not set in environment variable");
}