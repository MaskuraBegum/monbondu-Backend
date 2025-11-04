import mongoose from "mongoose";

const tipSchema = new mongoose.Schema({
  season: { type: String, required: true }, // Monsoon, Winter, Summer
  text: { 
    bn: { type: String, required: true },
    en: { type: String, required: true }
  }
}, { timestamps: true });

const Tip = mongoose.model("Tip", tipSchema);
export default Tip;
