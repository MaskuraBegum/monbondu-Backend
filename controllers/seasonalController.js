import SeasonalAlert from "../models/SeasonalAlert.js";
import axios from "axios";

export const getSeasonalAlerts = async (req, res) => {
  try {
    const { season, lang = "bn", city } = req.query;

    let currentSeason = season;

    if (!currentSeason && city) {
      // Optional: detect season from weather API
      const weatherRes = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${process.env.WEATHER_API_KEY}`
      );

      const month = new Date().getMonth() + 1;
      if (month >= 6 && month <= 9) currentSeason = "Monsoon";
      else if (month >= 12 || month <= 2) currentSeason = "Winter";
      else currentSeason = "Summer";
    }

    if (!currentSeason) return res.status(400).json({ error: "Season or city is required" });

    const alerts = await SeasonalAlert.find({ season: currentSeason });

    const formattedAlerts = alerts.map((alert) => ({
      id: alert._id,
      title: alert.title[lang],
      warning: alert.warning[lang],
      tips: alert.tips.map((t) => t[lang]),
      awareness: alert.awareness[lang],
      season: alert.season,
    }));

    res.json(formattedAlerts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
