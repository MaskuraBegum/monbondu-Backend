import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";

// Routes
import moodRoutes from "./routes/moodRoutes.js";
import facilityRoutes from "./routes/facilityRoutes.js";
import helpRoutes from "./routes/helpRoutes.js";
import tipsRoutes from "./routes/tips.js";
import seasonalRoutes from "./routes/seasonal.js";
import diseaseRoutes from "./routes/diseaseRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "200kb" }));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.log("❌ DB Error:", err));

// Root route
app.get("/", (req, res) => {
  res.send("🧠 MonBondhu backend running successfully!");
});

// API Routes
app.use("/api/mood", moodRoutes);
app.use("/api/facilities", facilityRoutes);
app.use("/api/help", helpRoutes);
app.use("/api/tips", tipsRoutes);
app.use("/api/seasonal", seasonalRoutes);
app.use("/api/disease", diseaseRoutes);

// Health-check
app.get("/health", (req, res) => {
  res.json({ ok: true, uptime: process.uptime(), message: "Backend is healthy 💚" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));


