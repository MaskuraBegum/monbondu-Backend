// index.js (your current setup)
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/db.js";

// Existing MonBondhu routes
import moodRoutes from "./routes/moodRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";
import tipsRoutes from "./routes/tips.js";
import seasonalRoutes from "./routes/seasonal.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";

// New Disease Awareness routes
import symptomRoutes from "./routes/symptomRoutes.js";
import trendRoutes from "./routes/trendRoutes.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json({ limit: "200kb" }));

// Connect DB
connectDB();

// Root route
app.get("/", (req, res) => {
  res.send("🧠 MonBondhu backend running successfully!");
});

// MonBondhu API routes
app.use("/api/mood", moodRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/seasonal", seasonalRoutes);
app.use("/api/disease", diseaseRoutes);

// Disease Awareness API routes
app.use("/api/symptoms", symptomRoutes);
app.use("/api/trends", trendRoutes);

// Offline info fallback
app.get("/api/offline-info", (req, res) => {
  res.json({
    tips: [
      "💧 Drink clean water and stay hydrated.",
      "🧼 Wash your hands often.",
      "🍎 Eat healthy food, avoid junk.",
      "😴 Get enough sleep for recovery."
    ],
  });
});

// Health-check
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime(), message: "Backend is healthy 💚" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
