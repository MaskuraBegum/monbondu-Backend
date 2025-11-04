import express from "express";
import { getWeeklyTrends } from "../controllers/trendController.js";

const router = express.Router();

router.get("/", getWeeklyTrends);

export default router;
