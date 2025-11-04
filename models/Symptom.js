import mongoose from "mongoose";

const SymptomSchema = new mongoose.Schema({
    name_en: { type: String, required: true, unique: true },
    name_bn: { type: String, required: true },
    category: { type: String },
    level: { type: String },
    advice: { type: String },
    advice_bn: { type: String },
    description: { type: String },       // NEW: English description
    description_bn: { type: String },    // NEW: Bangla description
});

export default mongoose.model("Symptom", SymptomSchema);
