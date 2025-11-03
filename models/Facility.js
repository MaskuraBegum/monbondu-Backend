import mongoose from "mongoose";

const facilitySchema = new mongoose.Schema({
  name: { type: String, required: true },
  type: {
    type: String,
    enum: [
      "কমিউনিটি ক্লিনিক",
      "উপজেলা স্বাস্থ্য কমপ্লেক্স",
      "এনজিও সেন্টার",
      "ফার্মেসি",
      "CHW"
    ],
    required: true,
  },

  // ✅ GeoJSON format for location (required for geospatial queries)
  location: {
    type: {
      type: String,
      enum: ["Point"],
      default: "Point",
    },
    coordinates: {
      type: [Number], // [longitude, latitude]
      required: true,
    },
  },

  // ✅ Keep your other fields as they are
  landmark: { type: String },
  contact: { type: String },
  travelDifficulty: { type: Number, default: 1 },
  openingHours: { type: String },
});

// ✅ Create a geospatial index
facilitySchema.index({ location: "2dsphere" });

export default mongoose.model("Facility", facilitySchema);
