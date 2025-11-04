import mongoose from "mongoose";

const HelpRequestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true }, // generated id only
  emotion: { type: String }, // e.g., "Sad", "Alone" (optional)
  message: { type: String, required: true }, // user's text
  consent: { type: Boolean, default: true }, // user gave consent
  status: { type: String, enum: ["Pending", "Assigned", "Contacted", "Resolved"], default: "Pending" },
  assignedTo: { type: String, default: null }, // NGO or volunteer name/id (optional)
  contactInfo: { // stored only if user later provides contact willingly
    phone: { type: String, default: null },
    email: { type: String, default: null }
  },
  synced: { type: Boolean, default: true }, // false if saved only client-side; set true when synced
}, { timestamps: true });

export default mongoose.model("HelpRequest", HelpRequestSchema);
