import express from "express";
import { getSeasonalAlerts } from "../controllers/seasonalController.js";

const router = express.Router();

// GET /api/seasonal?season=Monsoon&lang=bn
router.get("/", getSeasonalAlerts);

export default router;
