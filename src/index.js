import { config } from "./config/env.js";
import connectDB from "./config/db.js";
import { app } from "./app.js";

connectDB()
    .then(() => {
        app.listen(config.port, () => {
            console.log(`Server is running on Port: ${config.port}`);
        });
    })
    .catch((error) => {
        console.error("MONGODB connection failed", error);
    });