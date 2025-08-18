import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from "./config/env.js";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(cookieParser())

import userRoutes from "./routes/user.routes.js";

app.use("/api/v1/users", userRoutes);

export {app};