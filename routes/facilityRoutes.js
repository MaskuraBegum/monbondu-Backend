// routes/facilityRoutes.js
import express from "express";
import Facility from "../models/Facility.js";

const router = express.Router();

// ✅ GET nearest facilities: /api/facilities/nearest?lat=23.8&lng=90.4
router.get("/nearest", async (req, res) => {
  const { lat, lng } = req.query;

  if (!lat || !lng) {
    return res.status(400).json({ message: "Latitude and longitude are required" });
  }

  try {
    const facilities = await Facility.aggregate([
      {
        $geoNear: {
          near: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)], // [lng, lat]
          },
          distanceField: "distance", // distance in meters
          spherical: true,
        },
      },
      {
        // ✅ Add travel difficulty weighting (optional fine-tuning)
        $addFields: {
          weightedScore: {
            $multiply: ["$distance", "$travelDifficulty"],
          },
        },
      },
      { $sort: { weightedScore: 1 } }, // nearest + easiest first
      { $limit: 20 },
    ]);

    res.json(facilities);
  } catch (err) {
    console.error("Error in /nearest:", err);
    res.status(500).json({ message: "Failed to fetch nearby facilities", error: err.message });
  }
});

export default router;
