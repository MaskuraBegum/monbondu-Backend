// fetchOSMFacilities.js
import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import axios from "axios";
import Facility from "./models/Facility.js";

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Fetch healthcare facilities from OSM (Bangladesh)
const fetchOSMFacilities = async () => {
  try {
    console.log("Fetching healthcare facilities from OSM...");

    // Overpass API query
    const query = `
      [out:json][timeout:50];
      area["ISO3166-1"="BD"]->.searchArea;
      (
        node["amenity"="clinic"](area.searchArea);
        node["amenity"="hospital"](area.searchArea);
        node["amenity"="pharmacy"](area.searchArea);
        node["healthcare"="clinic"](area.searchArea);
        node["healthcare"="doctors"](area.searchArea);
      );
      out body;
    `;

    const url = "https://overpass-api.de/api/interpreter";
    const res = await axios.post(url, query, {
      headers: { "Content-Type": "text/plain" },
    });

    const elements = res.data.elements;
    console.log(`Fetched ${elements.length} facilities from OSM.`);

    const facilities = elements.map((el) => {
      let type = "CHW"; // default fallback

      if (el.tags?.amenity === "clinic") type = "কমিউনিটি ক্লিনিক";
      else if (el.tags?.amenity === "hospital") type = "উপজেলা স্বাস্থ্য কমপ্লেক্স";
      else if (el.tags?.amenity === "pharmacy") type = "ফার্মেসি";
      else if (el.tags?.healthcare === "clinic") type = "কমিউনিটি ক্লিনিক";
      else if (el.tags?.healthcare === "doctors") type = "CHW";

      return {
        name: el.tags?.name || "অজানা নাম",
        type,
        location: {
          type: "Point",
          coordinates: [el.lon, el.lat],
        },
        landmark: el.tags?.description || el.tags?.note || "",
        travelDifficulty: 1,
        contact: el.tags?.phone || el.tags?.email || "",
        openingHours: el.tags?.opening_hours || "",
      };
    });

    // Insert into MongoDB
    await Facility.insertMany(facilities);
    console.log(`✅ Inserted ${facilities.length} facilities into MongoDB.`);
  } catch (err) {
    console.error("❌ Error fetching/inserting facilities:", err);
  } finally {
    mongoose.disconnect();
  }
};

fetchOSMFacilities();
