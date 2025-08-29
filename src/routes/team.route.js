import { Router } from "express";
import {
    createTeam,
    getMyTeams,
    addMember,
    removeMember,
    deleteTeam
} from "../controllers/team.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

// All team routes need authentication
router.use(verifyJWT);

// Create new team
router.post("/create", createTeam);

// Get teams of logged-in user
router.get("/my-teams", getMyTeams);

// Add member to team
router.post("/add-member", addMember);

// Remove member from team
router.post("/remove-member", removeMember);

// Delete team
router.delete("/:teamId", deleteTeam);

export default router;
