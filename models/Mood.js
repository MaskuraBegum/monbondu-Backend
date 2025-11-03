import mongoose from "mongoose";

const moodSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: String, enum: ["happy", "neutral", "sad"], required: true },
  note: { type: String }, // can store Bengali text
  date: { type: Date, default: Date.now }, // auto set current date
});

export default mongoose.model("Mood", moodSchema);
