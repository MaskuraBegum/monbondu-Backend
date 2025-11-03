import axios from "axios";
import mongoose from "mongoose";
import Facility from "./models/Facility.js";
import dotenv from "dotenv";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ DB Error:", err));

async function fetchFacilities() {
  try {
    const query = `
      [out:json][timeout:25];
      area["name"="Bangladesh"]->.searchArea;
      (
        node["amenity"="clinic"](area.searchArea);
        node["amenity"="hospital"](area.searchArea);
        node["amenity"="pharmacy"](area.searchArea);
      );
      out body;
    `;

    const res = await axios.post("https://overpass-api.de/api/interpreter", query);
    const elements = res.data.elements;

    const facilities = elements.map((el) => ({
      name: el.tags.name || "Unnamed Facility",
      type: el.tags.amenity === "clinic" ? "কমিউনিটি ক্লিনিক"
             : el.tags.amenity === "hospital" ? "উপজেলা স্বাস্থ্য কমপ্লেক্স"
             : "ফার্মেসি",
      location: { type: "Point", coordinates: [el.lon, el.lat] },
      landmark: el.tags["description"] || "",
      travelDifficulty: 1,
      openingHours: el.tags.opening_hours || "",
    }));

    await Facility.insertMany(facilities);
    console.log(`✅ Inserted ${facilities.length} facilities`);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.disconnect();
  }
}

fetchFacilities();
