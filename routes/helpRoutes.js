import express from "express";
import {
  createHelpRequest,
  syncHelpRequests,
  listHelpRequests,
  updateHelpRequest,
} from "../controllers/helpController.js";

const router = express.Router();

// GET all help requests
router.get("/", listHelpRequests);

// POST new request
router.post("/", createHelpRequest);

// POST sync multiple requests (offline queue)
router.post("/sync", syncHelpRequests);

// PATCH update request by requestId
router.patch("/:requestId", updateHelpRequest);

export default router;
