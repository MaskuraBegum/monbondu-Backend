import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Symptom from "./models/Symptom.js";

dotenv.config();
connectDB();

const clearSymptoms = async () => {
  try {
    await Symptom.deleteMany({});
    console.log("✅ Symptoms cleared");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

clearSymptoms();
