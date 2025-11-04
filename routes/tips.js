import express from "express";
import { getRandomTip, getAllTips } from "../controllers/tipsController.js";

const router = express.Router();

// GET /api/tips?season=Monsoon&lang=bn
router.get("/", getRandomTip);

// GET /api/tips/all
router.get("/all", getAllTips);

export default router;
