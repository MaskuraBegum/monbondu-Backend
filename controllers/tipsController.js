import Tip from "../models/Tip.js";

// GET random tip by season & language
export const getRandomTip = async (req, res) => {
  try {
    const { season, lang } = req.query;
    const tips = season ? await Tip.find({ season }) : await Tip.find();
    if (!tips.length) return res.status(404).json({ msg: "No tips found" });

    const randomTip = tips[Math.floor(Math.random() * tips.length)];
    res.json({ tip: randomTip.text[lang || "bn"] });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// GET all tips grouped by season
export const getAllTips = async (req, res) => {
  try {
    const tips = await Tip.find();
    const grouped = tips.reduce((acc, tip) => {
      if (!acc[tip.season]) acc[tip.season] = [];
      acc[tip.season].push(tip.text);
      return acc;
    }, {});
    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
