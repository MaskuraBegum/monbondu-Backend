import mongoose from "mongoose";

const SeasonalAlertSchema = new mongoose.Schema({
  season: { type: String, enum: ["Monsoon", "Winter", "Summer"], required: true },
  title: {
    bn: { type: String, required: true },
    en: { type: String, required: true },
  },
  warning: {
    bn: { type: String, required: true },
    en: { type: String, required: true },
  },
  tips: [
    {
      bn: { type: String, required: true },
      en: { type: String, required: true },
    },
  ],
  awareness: {
    bn: { type: String, required: true },
    en: { type: String, required: true },
  },
});

export default mongoose.model("SeasonalAlert", SeasonalAlertSchema);
