import mongoose from "mongoose";

const TrendSchema = new mongoose.Schema({
  name_en: { type: String, required: true, unique: true },
  name_bn: { type: String, required: true },
  percentage: { type: Number, required: true },
});

export default mongoose.model("Trend", TrendSchema);
