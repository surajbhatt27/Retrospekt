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

export { createTeam,
};