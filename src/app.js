import express from "express";
import cookieParser from "cookie-parser";
import cors from 'cors';
import { config } from "dotenv.js";

const app = express();

app.use(cors({
    origin: config.corsOrigin,
    credentials: true
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))``
app.use(cookieParser())

export {app};