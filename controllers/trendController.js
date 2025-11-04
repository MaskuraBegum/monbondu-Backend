import UserReport from "../models/UserReport.js";

export const getWeeklyTrends = async (req, res) => {
  try {
    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const data = await UserReport.aggregate([
      { $match: { date: { $gte: oneWeekAgo } } },
      { $group: { _id: "$symptom", count: { $sum: 1 } } },
      { $sort: { count: -1 } },
      { $limit: 5 }
    ]);

    res.json({ success: true, trends: data });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
