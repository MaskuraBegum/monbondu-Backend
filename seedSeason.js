import mongoose from "mongoose";
import dotenv from "dotenv";
import SeasonalAlert from "./models/SeasonalAlert.js";

dotenv.config();

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected for seeding"))
  .catch((err) => console.log("❌ DB Connection Error:", err));

// Seed Data (20 seasonal alerts)
const seasonalData = [
  // --- MONSOON ---
  {
    season: "Monsoon",
    title: { bn: "ডেঙ্গু সতর্কতা", en: "Dengue Alert" },
    warning: { bn: "জ্বর, মাথা ব্যথা, চোখে লালচে ভাব", en: "Fever, headache, red eyes" },
    tips: [
      { bn: "পানি জমে থাকা এলাকায় মশারি/নিষ্কাশন করুন", en: "Clear standing water and drains" },
      { bn: "প্রতিদিন নখ, পাত্র পরিষ্কার রাখুন", en: "Keep nails and utensils clean daily" },
      { bn: "স্থানীয় ক্লিনিক বা CHW এর সাথে যোগাযোগ করুন", en: "Contact local clinic or CHW if needed" }
    ],
    awareness: { bn: "মশারিতে বসে থাকা রোগ ছড়ায়। সতর্ক থাকুন।", en: "Diseases spread via mosquitoes. Stay alert." }
  },
  {
    season: "Monsoon",
    title: { bn: "পানি-সংক্রান্ত রোগ", en: "Water-borne Diseases" },
    warning: { bn: "ডায়রিয়া, পেটব্যথা, বমি", en: "Diarrhea, stomach pain, vomiting" },
    tips: [
      { bn: "পরিষ্কার পানি পান করুন", en: "Drink clean water" },
      { bn: "খাবার আগে ভালোভাবে ধুয়ে নিন", en: "Wash food properly before eating" },
      { bn: "হ্যান্ডওয়াশ ব্যবহার করুন", en: "Use handwash" }
    ],
    awareness: { bn: "পরিচ্ছন্ন পানি জীবনের মূল।", en: "Clean water is essential for life." }
  },
  {
    season: "Monsoon",
    title: { bn: "জলবায়ু সংক্রান্ত অ্যালার্জি", en: "Climate Allergies" },
    warning: { bn: "কাশি, চোখ লাল, চর্ম সমস্যা", en: "Cough, red eyes, skin issues" },
    tips: [
      { bn: "ঘর পরিষ্কার রাখুন", en: "Keep your room clean" },
      { bn: "বাইরের ধুলো ও জল পরিহার করুন", en: "Avoid outdoor dust and water" },
      { bn: "প্রয়োজনে ডাক্তার পরামর্শ নিন", en: "Consult a doctor if needed" }
    ],
    awareness: { bn: "সতর্ক থাকলে অ্যালার্জি কমানো যায়।", en: "Proper care reduces allergies." }
  },
  {
    season: "Monsoon",
    title: { bn: "পানিতে সংক্রমণ", en: "Water Contamination" },
    warning: { bn: "জ্বর, বমি, পেটব্যথা", en: "Fever, vomiting, stomach pain" },
    tips: [
      { bn: "নিষ্কলুষ পানি পান করুন", en: "Drink purified water" },
      { bn: "খাবার ভালোভাবে রান্না করুন", en: "Cook food properly" },
      { bn: "হাইজিন বজায় রাখুন", en: "Maintain hygiene" }
    ],
    awareness: { bn: "পরিচ্ছন্নতা সংক্রমণ কমায়।", en: "Cleanliness reduces infection." }
  },
  {
    season: "Monsoon",
    title: { bn: "বৃষ্টির কারণে দুর্ঘটনা", en: "Rainy Season Accidents" },
    warning: { bn: "পায়ে ফिसলে যাওয়া, ট্র্যাফিক দুর্ঘটনা", en: "Slips, traffic accidents" },
    tips: [
      { bn: "বৃষ্টির সময় সাবধানতার সঙ্গে চলাফেরা করুন", en: "Move carefully in rain" },
      { bn: "উঁচু জায়গায় ছাতা ব্যবহার করুন", en: "Use umbrella on higher grounds" },
      { bn: "পরিষ্কার জুতো ব্যবহার করুন", en: "Wear non-slip shoes" }
    ],
    awareness: { bn: "বৃষ্টির সময় সাবধান থাকুন।", en: "Be careful during rain." }
  },

  // --- SUMMER ---
  {
    season: "Summer",
    title: { bn: "ডিহাইড্রেশন ও তাপপ্রভাব", en: "Dehydration & Heat Stroke" },
    warning: { bn: "মাথা ঘোরা, ক্লান্তি, অতিরিক্ত ঘাম", en: "Dizziness, fatigue, excessive sweating" },
    tips: [
      { bn: "পর্যাপ্ত পানি পান করুন", en: "Drink enough water" },
      { bn: "সরাসরি রোদ এড়ান", en: "Avoid direct sunlight" },
      { bn: "হালকা পোশাক ব্যবহার করুন", en: "Wear light clothes" }
    ],
    awareness: { bn: "গরমে নিজেকে হাইড্রেটেড রাখুন।", en: "Stay hydrated in heat." }
  },
  {
    season: "Summer",
    title: { bn: "ডায়রিয়া ও পানিশূন্যতা", en: "Diarrhea & Dehydration" },
    warning: { bn: "ডায়রিয়া, মাথা ঘোরা, ডিহাইড্রেশন", en: "Diarrhea, dizziness, dehydration" },
    tips: [
      { bn: "পরিষ্কার পানি পান করুন", en: "Drink clean water" },
      { bn: "ওআরএস ব্যবহার করুন", en: "Use ORS" },
      { bn: "গরমে বাইরে দীর্ঘ সময় থাকবেন না", en: "Avoid long outdoor exposure in heat" }
    ],
    awareness: { bn: "পরিষ্কার পানি ও খাবারই সেরা প্রতিরোধ।", en: "Clean water & food prevent disease." }
  },
  {
    season: "Summer",
    title: { bn: "তাপের কারণে চুলকানি", en: "Heat Rash" },
    warning: { bn: "চুলকানি, লাল দাগ", en: "Itching, red spots" },
    tips: [
      { bn: "ঠান্ডা পানি দিয়ে ধুয়ে নিন", en: "Wash with cold water" },
      { bn: "হালকা পোশাক পরুন", en: "Wear light clothes" },
      { bn: "প্রয়োজনে মেডিকেল পরামর্শ নিন", en: "Consult doctor if needed" }
    ],
    awareness: { bn: "গরমে ত্বক খেয়াল রাখুন।", en: "Take care of skin in heat." }
  },
  {
    season: "Summer",
    title: { bn: "সানস্ট্রোক প্রতিরোধ", en: "Sunstroke Prevention" },
    warning: { bn: "মাথা ব্যথা, বমি, ক্লান্তি", en: "Headache, vomiting, fatigue" },
    tips: [
      { bn: "প্রচুর পানি পান করুন", en: "Drink plenty of water" },
      { bn: "সরাসরি রোদ এড়ান", en: "Avoid direct sunlight" },
      { bn: "হালকা পোশাক ব্যবহার করুন", en: "Wear light clothing" }
    ],
    awareness: { bn: "রোদে সতর্ক থাকুন।", en: "Be careful in sunlight." }
  },
  {
    season: "Summer",
    title: { bn: "গরমে অসুস্থতা", en: "Heat-related Illness" },
    warning: { bn: "উত্তেজনা, ক্লান্তি, মাথা ব্যথা", en: "Irritation, fatigue, headache" },
    tips: [
      { bn: "ঠান্ডা জায়গায় থাকুন", en: "Stay in cool place" },
      { bn: "জলে হাইড্রেটেড থাকুন", en: "Stay hydrated" },
      { bn: "সঠিক খাদ্য নিন", en: "Eat proper meals" }
    ],
    awareness: { bn: "গরমে স্বাস্থ্য বজায় রাখুন।", en: "Maintain health in summer." }
  },
  {
    season: "Summer",
    title: { bn: "খাবার সংক্রান্ত অসুস্থতা", en: "Foodborne Illness" },
    warning: { bn: "বমি, ডায়রিয়া, পেটব্যথা", en: "Vomiting, diarrhea, stomach pain" },
    tips: [
      { bn: "খাবার ভালোভাবে ধুয়ে নিন", en: "Wash food properly" },
      { bn: "পরিষ্কার পানি ব্যবহার করুন", en: "Use clean water" },
      { bn: "গরমে বাইরে দীর্ঘ সময় খাবার রাখবেন না", en: "Do not leave food outside in heat" }
    ],
    awareness: { bn: "পরিচ্ছন্নতা মেনে চলুন।", en: "Maintain hygiene." }
  },

  // --- WINTER ---
  {
    season: "Winter",
    title: { bn: "সর্দি ও কাশি", en: "Cold & Cough" },
    warning: { bn: "সর্দি, কাশি, শরীর ব্যথা", en: "Cold, cough, body ache" },
    tips: [
      { bn: "গরম কাপড় পরুন", en: "Wear warm clothes" },
      { bn: "হাতে হ্যান্ডওয়াশ ব্যবহার করুন", en: "Use handwash" },
      { bn: "ভিটামিন সি সমৃদ্ধ খাবার খান", en: "Eat Vitamin C rich food" }
    ],
    awareness: { bn: "শীতকালীন রোগ থেকে সতর্ক থাকুন।", en: "Stay alert for winter illnesses." }
  },
  {
    season: "Winter",
    title: { bn: "নিম্নশ্বাসজনিত অসুখ", en: "Respiratory Issues" },
    warning: { bn: "সাংস নিতে সমস্যা, শ্বাসকষ্ট", en: "Breathing difficulty, shortness of breath" },
    tips: [
      { bn: "গরম পরিবেশে থাকুন", en: "Stay warm" },
      { bn: "ধূমপান এড়ান", en: "Avoid smoking" },
      { bn: "প্রয়োজনে ডাক্তার দেখান", en: "Consult doctor if needed" }
    ],
    awareness: { bn: "শীতকালে শ্বাসপ্রশ্বাস সচেতন থাকুন।", en: "Be careful with breathing in winter." }
  },
  {
    season: "Winter",
    title: { bn: "ঠান্ডাজনিত চর্ম সমস্যা", en: "Cold-induced Skin Issues" },
    warning: { bn: "ত্বক শুকনা, চুলকানি", en: "Dry skin, itching" },
    tips: [
      { bn: "লুব্রিকেন্ট ক্রিম ব্যবহার করুন", en: "Use moisturizer cream" },
      { bn: "গরম জলে স্নান করুন", en: "Take warm showers" },
      { bn: "হালকা পোশাক ব্যবহার করুন", en: "Wear light warm clothes" }
    ],
    awareness: { bn: "ঠান্ডায় ত্বকের যত্ন নিন।", en: "Take care of skin in cold." }
  },
  {
    season: "Winter",
    title: { bn: "শীতকালীন ভাইরাস", en: "Winter Viruses" },
    warning: { bn: "জ্বর, সর্দি, কাশি", en: "Fever, cold, cough" },
    tips: [
      { bn: "হাতে নিয়মিত স্যানিটাইজ করুন", en: "Sanitize hands regularly" },
      { bn: "গরম খাবার খান", en: "Eat warm food" },
      { bn: "ভিড় এড়ান", en: "Avoid crowds" }
    ],
    awareness: { bn: "ভাইরাস থেকে সতর্ক থাকুন।", en: "Stay alert for viruses." }
  },
  {
    season: "Winter",
    title: { bn: "শীতকালীন ক্লান্তি", en: "Winter Fatigue" },
    warning: { bn: "দেহে দুর্বলতা, ঘুমের ঘাটতি", en: "Weakness, lack of sleep" },
    tips: [
      { bn: "পর্যাপ্ত ঘুম নিন", en: "Get enough sleep" },
      { bn: "গরম পরিবেশে থাকুন", en: "Stay warm" },
      { bn: "পুষ্টিকর খাবার খান", en: "Eat nutritious food" }
    ],
    awareness: { bn: "শীতকালীন শক্তি বজায় রাখুন।", en: "Maintain energy in winter." }
  }
];

// Seed function
const seedDB = async () => {
  try {
    await SeasonalAlert.deleteMany(); // Clear existing data
    await SeasonalAlert.insertMany(seasonalData);
    console.log("✅ Seasonal Alerts Seeded Successfully!");
  } catch (err) {
    console.error("❌ Seeding Error:", err);
  } finally {
    mongoose.connection.close();
  }
};

seedDB();
