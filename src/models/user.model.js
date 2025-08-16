import mongoose from "mongoose";
import bcrypt from "bcrypt";
import {config} from "../config/env.js";
import jwt from "jsonwebtoken";

const userSchema = new mongoose.Schema({
    username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            index: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    fullName: {
        type: String,
        trim: true
    },
    role: {
        type: String,
        enum: ["admin", "member"],
        default: "member"
    },
    refreshToken: {
        type: String
    }
}, { timestamps: true });

// Hash password before save
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

// Password compare method
userSchema.methods.isPasswordCorrect = async function (password) {
    return await bcrypt.compare(password, this.password);
};

// Generate access token
userSchema.methods.generateAccessToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
            email: this.email,
            fullName: this.fullName
        },
        config.accessTokenSecret,
        {
            expiresIn: config.accessTokenExpiry
        }
    )
}

userSchema.methods.generateRefreshToken = async function () {
    return jwt.sign(
        {
            _id: this._id,
        },
        config.refreshTokenSecret,
        {
            expiresIn: config.refreshTokenExpiry
        }
    )
}

export const User = mongoose.model("User", userSchema);