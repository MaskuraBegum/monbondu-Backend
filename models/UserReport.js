import mongoose from "mongoose";

const userReportSchema = new mongoose.Schema({
  symptom: { type: String, required: true },
  city: { type: String, default: "Unknown" },
  date: { type: Date, default: Date.now }
});

export default mongoose.model("UserReport", userReportSchema);
