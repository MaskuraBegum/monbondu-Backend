import express from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

router.post("/chat", async (req, res) => {
  try {
    const { symptoms } = req.body;

    if (!symptoms) {
      return res.status(400).json({ error: "Symptoms are required." });
    }

    const systemPrompt = `
You are an expert medical AI assistant. Based on the user's symptoms, suggest possible diseases they might have. 
Provide some details, concise suggestions what should they do. Do not give medical prescriptions. use Bangla word always. mention what to do if pregrent and 1-2 year child

`;

    const userMessage = `Symptoms: ${symptoms}`;

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });
    const result = await model.generateContent(`${systemPrompt}\n\n${userMessage}`);

    const text = result.response.text();
    res.json({ success: true, possibleDiseases: text });
  } catch (error) {
    console.error("Gemini error:", error);
    res.status(500).json({ success: false, error: "Failed to generate disease prediction." });
  }
});

export default router;
