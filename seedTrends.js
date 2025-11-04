import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Trend from "./models/Trend.js";

dotenv.config();
connectDB();

const trendsData = [
  { name_en: "Cough", name_bn: "কাশি", percentage: 40 },
  { name_en: "Fever", name_bn: "জ্বর", percentage: 35 },
  { name_en: "Diarrhea", name_bn: "দস্ত", percentage: 20 },
  { name_en: "Chest Pain", name_bn: "বুকে ব্যথা", percentage: 10 },
  { name_en: "Vomiting", name_bn: "বমি", percentage: 15 },
  { name_en: "Feeling Sad", name_bn: "দুঃখিত অনুভূতি", percentage: 25 },
  { name_en: "Fatigue", name_bn: "থকথকে ভাব", percentage: 30 },
  { name_en: "Headache", name_bn: "মাথাব্যথা", percentage: 28 },
  { name_en: "Shortness of Breath", name_bn: "শ্বাসকষ্ট", percentage: 12 },
  { name_en: "Anxiety", name_bn: "উদ্বেগ", percentage: 18 },
];

const seedTrends = async () => {
  try {
    await Trend.deleteMany();
    await Trend.insertMany(trendsData);
    console.log("✅ Trends seeded successfully");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedTrends();
