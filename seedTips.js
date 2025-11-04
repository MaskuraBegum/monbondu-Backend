import mongoose from "mongoose";
import dotenv from "dotenv";
import Tip from "./models/Tip.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

const tips = [
  // 🌧 Monsoon Tips
  {
    season: "Monsoon",
    text: {
      bn: "পানি জমে থাকা এলাকায় মশারি/নিষ্কাশন করুন",
      en: "Clear standing water and drains",
    },
  },
  {
    season: "Monsoon",
    text: {
      bn: "প্রতিদিন নখ ও পাত্র পরিষ্কার রাখুন",
      en: "Keep nails and utensils clean daily",
    },
  },
  {
    season: "Monsoon",
    text: {
      bn: "প্রয়োজনে স্থানীয় ক্লিনিক বা CHW এর সাথে যোগাযোগ করুন",
      en: "Contact local clinic or CHW if needed",
    },
  },

  // ❄ Winter Tips
  {
    season: "Winter",
    text: {
      bn: "গরম পানি পান করুন",
      en: "Drink warm water",
    },
  },
  {
    season: "Winter",
    text: {
      bn: "হালকা উষ্ণ পোশাক ব্যবহার করুন",
      en: "Wear light warm clothes",
    },
  },
  {
    season: "Winter",
    text: {
      bn: "শিশুদের ভ্যাকসিন ঠিকমতো দিতে ভুলবেন না",
      en: "Ensure children get vaccines",
    },
  },

  // ☀ Summer Tips
  {
    season: "Summer",
    text: {
      bn: "পর্যাপ্ত পানি পান করুন",
      en: "Drink enough water",
    },
  },
  {
    season: "Summer",
    text: {
      bn: "সরাসরি রোদ এড়ান",
      en: "Avoid direct sunlight",
    },
  },
  {
    season: "Summer",
    text: {
      bn: "হালকা পোশাক ব্যবহার করুন",
      en: "Wear light clothes",
    },
  },
];

const seedDB = async () => {
  try {
    await Tip.deleteMany({}); // Remove old tips
    await Tip.insertMany(tips);
    console.log("✅ Tips seeded successfully!");
  } catch (err) {
    console.log("❌ Seeding error:", err);
  } finally {
    mongoose.disconnect();
  }
};

seedDB();
