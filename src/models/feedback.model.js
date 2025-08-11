import mongoose from "mongoose";

const feedbackSchema = new mongoose.Schema({
    session: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Session",
        required: true
    },
    content: {
        type: String,
        required: true,
        trim: true
    },
    category: {
        type: String,
        trim: true
    }
}, { timestamps: true });

export const Feedback = mongoose.model("Feedback", feedbackSchema);