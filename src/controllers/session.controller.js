import { Session } from "../models/session.model.js";
import { Team } from "../models/team.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

// Create a new session (team owner only)
export const createSession = asyncHandler(async (req, res) => {
    const { teamId, title, description } = req.body;

    if (!teamId || !title) {
        throw new ApiError(400, "Team ID and session title are required");
    }

    const team = await Team.findById(teamId);
    if (!team) throw new ApiError(404, "Team not found");

    // Only team owner can create session
    if (team.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the team owner can create sessions");
    }

    const session = await Session.create({
        team: teamId,
        title,
        description,
        createdBy: req.user._id
    });

    return res
        .status(201)
        .json(new ApiResponse(201, session, "Session created successfully"));
});

// Get all sessions for a team
export const getSessions = asyncHandler(async (req, res) => {
    const { teamId } = req.params;

    const sessions = await Session.find({ team: teamId }).sort({ createdAt: -1 });

    return res
        .status(200)
        .json(new ApiResponse(200, sessions, "Sessions fetched successfully"));
});

export {createSession,
        getSessions
}