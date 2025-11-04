import dotenv from "dotenv";
dotenv.config();
import mongoose from "mongoose";
import Facility from "./models/Facility.js";



mongoose.connect(process.env.MONGO_URI);

const seedFacilities = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("✅ MongoDB Connected");
  
      const types = ["কমিউনিটি ক্লিনিক", "ফার্মেসি", "CHW"];
      const landmarks = ["Beside the mango tree", "Near school gate", "Next to park"];
      const accessModes = [["bus"], ["boat"], ["foot"], ["bus","foot"], ["boat","foot"]];
  
      const getRandomCoordinates = () => {
        const lat = 23.70 + Math.random() * 0.15;
        const lng = 90.35 + Math.random() * 0.15;
        return [parseFloat(lng.toFixed(6)), parseFloat(lat.toFixed(6))];
      };
  
      const facilities = [];
      for (let i = 0; i < 50; i++) {
        const type = types[Math.floor(Math.random() * types.length)];
        const landmark = landmarks[Math.floor(Math.random() * landmarks.length)];
        const modes = accessModes[Math.floor(Math.random() * accessModes.length)];
  
        facilities.push({
          name: `${type} ${i + 1}`,
          type,
          location: { type: "Point", coordinates: getRandomCoordinates() },
          travelDifficulty: Math.ceil(Math.random() * 3),
          accessModes: modes,
          landmark,
          upazila: "Example Upazila",
          union: `Union ${Math.ceil(Math.random() * 5)}`
        });
      }
  
      await Facility.insertMany(facilities);
      console.log("✅ Seeded 50 facilities");
    } catch (err) {
      console.error("❌ Seeding error:", err);
    } finally {
      mongoose.disconnect();
    }
  };
  
  seedFacilities();
