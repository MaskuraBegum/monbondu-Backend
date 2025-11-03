import Mood from "../models/Mood.js";

// ✅ POST /api/mood
export const createMood = async (req, res) => {
    try {
      const { userId, mood, note } = req.body; // remove date from here
      const newMood = new Mood({ userId, mood, note }); // date will be auto-set
      await newMood.save();
      res.status(201).json({ message: "মেজাজ সফলভাবে সংরক্ষণ করা হয়েছে 💭" });
    } catch (error) {
      res.status(500).json({ message: "মেজাজ সংরক্ষণ করতে সমস্যা হয়েছে", error });
    }
  };

// ✅ GET /api/mood/:userId/weekly
export const getWeeklyMood = async (req, res) => {
    try {
      const { userId } = req.params;
      const today = new Date();
      const weekAgo = new Date(today);
      weekAgo.setDate(today.getDate() - 6); // last 7 days including today
  
      // Fetch moods in last 7 days
      const moods = await Mood.find({ userId, date: { $gte: weekAgo } }).sort({ date: 1 });
  
      if (moods.length === 0) {
        return res.json({
          weekly_summary: [],
          averageMood: null,
          message: "এই সপ্তাহে কোনো মেজাজ লগ পাওয়া যায়নি।"
        });
      }
  
      // Assign numeric values for calculation
      const moodValues = { happy: 3, neutral: 2, sad: 1 };
      let totalScore = 0;
      moods.forEach(m => {
        totalScore += moodValues[m.mood];
      });
  
      // Average based on logged days only
      const avgScore = totalScore / moods.length;
      let avgMood = "";
      if (avgScore >= 2.5) avgMood = "সুখী";
      else if (avgScore >= 1.5) avgMood = "সাধারণ";
      else avgMood = "দুঃখী";
  
      // Translate mood keys to Bengali for summary
      const moodTranslation = { happy: "সুখী", neutral: "সাধারণ", sad: "দুঃখী" };
  
      const moodCountMap = {};
      moods.forEach(m => {
        const translated = moodTranslation[m.mood] || m.mood;
        moodCountMap[translated] = (moodCountMap[translated] || 0) + 1;
      });
  
      const translatedMoods = Object.entries(moodCountMap).map(([mood, count]) => ({
        mood,
        count
      }));
  
      res.json({
        weekly_summary: translatedMoods,
        averageMood: avgMood,
        message: `এই সপ্তাহের গড় মেজাজ: ${avgMood}`
      });
  
    } catch (error) {
      res.status(500).json({ message: "সাপ্তাহিক সংক্ষিপ্তসার আনার সময় সমস্যা হয়েছে", error });
    }
  };
  

// ✅ GET /api/mood/:userId/nudge
export const getNudge = async (req, res) => {
  try {
    const { userId } = req.params;
    const lastLog = await Mood.findOne({ userId }).sort({ date: -1 });

    if (!lastLog) {
      return res.json({ nudge: "স্বাগতম! আজকের আপনার মেজাজ রেকর্ড করুন 💭" });
    }

    const diffDays = Math.floor((Date.now() - lastLog.date) / (1000 * 60 * 60 * 24));

    if (diffDays >= 3) {
      return res.json({ nudge: "আপনার মনের খোঁজ নেওয়া হয়নি 💭 — একটু সময় নিয়ে আজকের মেজাজ লিখুন।" });
    }

    res.json({ nudge: null });
  } catch (error) {
    res.status(500).json({ message: "নাজের চেক করতে সমস্যা হয়েছে", error });
  }
};
