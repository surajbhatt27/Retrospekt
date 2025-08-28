import asyncHandler from "express-async-handler";
import Team from "../models/Team.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";

// Create a new team
const createTeam = asyncHandler(async (req, res) => {
    const { name, description } = req.body;

    if (!name) throw new ApiError(400, "Team name is required");

    const team = await Team.create({
        name,
        description,
        owner: req.user._id,
        members: [req.user._id]   // creator is also a member
    });

    return res
        .status(201)
        .json(new ApiResponse(201, team, "Team created successfully"));
});

// Get all teams of logged-in user
const getMyTeams = asyncHandler(async (req, res) => {
    const teams = await Team.find({ members: req.user._id })
        .populate("owner", "username email")
        .populate("members", "username email");

    return res
        .status(200)
        .json(new ApiResponse(200, teams, "Fetched user teams successfully"));
});

// Add a member to team
const addMember = asyncHandler(async (req, res) => {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) throw new ApiError(400, "Team ID and User ID required");

    const team = await Team.findById(teamId);
    if (!team) throw new ApiError(404, "Team not found");

    // Only owner can add members
    if (team.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the team owner can add members");
    }

    if (team.members.includes(userId)) {
        throw new ApiError(400, "User already in team");
    }

    team.members.push(userId);
    await team.save();

    return res
        .status(200)
        .json(new ApiResponse(200, team, "Member added successfully"));
});

// Remove a member
const removeMember = asyncHandler(async (req, res) => {
    const { teamId, userId } = req.body;

    if (!teamId || !userId) throw new ApiError(400, "Team ID and User ID required");

    const team = await Team.findById(teamId);
    if (!team) throw new ApiError(404, "Team not found");

    // Only owner can remove
    if (team.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the team owner can remove members");
    }

    team.members = team.members.filter(
        (member) => member.toString() !== userId.toString()
    );

    await team.save();

    return res
        .status(200)
        .json(new ApiResponse(200, team, "Member removed successfully"));
});

// Delete a team
const deleteTeam = asyncHandler(async (req, res) => {
    const { teamId } = req.params;

    const team = await Team.findById(teamId);
    if (!team) throw new ApiError(404, "Team not found");

    if (team.owner.toString() !== req.user._id.toString()) {
        throw new ApiError(403, "Only the team owner can delete the team");
    }

    await team.deleteOne();

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Team deleted successfully"));
});

export { createTeam,
        getMyTeams,
        addMember,
        removeMember,
        deleteTeam
};