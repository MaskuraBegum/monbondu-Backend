import mongoose from "mongoose";
import Facility from "./models/Facility.js";
import fs from "fs";
import dotenv from "dotenv";

dotenv.config();
mongoose.connect(process.env.MONGO_URI);

const data = JSON.parse(fs.readFileSync("real_facilities.json", "utf8"));

Facility.insertMany(data)
  .then(() => console.log("Real facilities seeded"))
  .finally(() => mongoose.disconnect());
