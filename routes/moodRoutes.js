import express from "express";
import { createMood, getWeeklyMood, getNudge } from "../controllers/moodController.js";

const router = express.Router();

router.post("/", createMood);
router.get("/:userId/weekly", getWeeklyMood);
router.get("/:userId/nudge", getNudge);

export default router;
