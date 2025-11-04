import express from "express";
import { getSymptomInfo, addSymptom, getAllSymptoms } from "../controllers/symptomController.js";

const router = express.Router();

router.get("/", getSymptomInfo);      // /api/symptoms?q=cough
router.post("/", addSymptom);         // Add new symptom data
router.get("/list", getAllSymptoms);  // For search suggestions

export default router;
