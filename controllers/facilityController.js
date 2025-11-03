import Facility from "../models/Facility.js";

// GET nearest facilities based on user location
export const getFacilities = async (req, res) => {
  try {
    const { lat, lng, maxDistance = 5000 } = req.query;
    if (!lat || !lng) {
      return res.status(400).json({ message: "Lat & Lng required" });
    }

    const facilities = await Facility.aggregate([
      {
        $geoNear: {
          near: { type: "Point", coordinates: [parseFloat(lng), parseFloat(lat)] },
          distanceField: "distance",
          maxDistance: parseFloat(maxDistance),
          spherical: true
        }
      },
      {
        $addFields: {
          score: { $multiply: ["$distance", "$travelDifficulty"] } // weighted ranking
        }
      },
      { $sort: { score: 1 } }, // nearest + easy access first
      { $limit: 20 }
    ]);

    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching facilities", error });
  }
};

// GET fallback list view for low literacy
export const getFacilitiesList = async (req, res) => {
  try {
    const { upazila, union } = req.query;
    const query = {};
    if (upazila) query.upazila = upazila;
    if (union) query.union = union;

    const facilities = await Facility.find(query).sort({ type: 1, name: 1 });
    res.json(facilities);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching facilities list", error });
  }
};
