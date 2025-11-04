import Symptom from "../models/Symptom.js";


// ✅ সব symptom দেখা
export const getAllSymptoms = async (req, res) => {
  try {
    const symptoms = await Symptom.find();
    res.status(200).json(symptoms);
  } catch (error) {
    res.status(500).json({ message: "Error fetching symptoms", error: error.message });
  }
};

// ✅ নির্দিষ্ট symptom তথ্য আনা
export const getSymptomInfo = async (req, res) => {
  try {
    const { symptom } = req.body;

    if (!symptom) {
      return res.status(400).json({ message: "Please provide a symptom" });
    }

    const symptomData = await Symptom.findOne({
      $or: [{ name_en: symptom }, { name_bn: symptom }],
    });

    if (!symptomData) {
      return res.status(404).json({ message: "Symptom not found" });
    }

    res.status(200).json(symptomData);
  } catch (error) {
    res.status(500).json({ message: "Error retrieving symptom", error: error.message });
  }
};

// ✅ নতুন symptom যোগ করা
export const addSymptom = async (req, res) => {
  try {
    const newSymptom = new Symptom(req.body);
    await newSymptom.save();
    res.status(201).json({ message: "Symptom added successfully", symptom: newSymptom });
  } catch (error) {
    res.status(500).json({ message: "Error adding symptom", error: error.message });
  }
};
