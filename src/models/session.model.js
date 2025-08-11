import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
        required: true
    },
    title: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["open", "closed"],
        default: "open"
    },
    openedAt: {
        type: Date,
        default: Date.now
    },
    closedAt: Date
}, { timestamps: true });

export const Session = mongoose.model("Session", sessionSchema);