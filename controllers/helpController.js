import HelpRequest from "../models/HelpRequest.js";
import { nanoid } from "nanoid";
import nodemailer from "nodemailer";

// =============== Helper: Send NGO notification email (English for internal team) ===================
const sendNotification = async ({ requestId, message }) => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS || !process.env.NGO_NOTIFICATION_EMAIL) {
    console.log("Notification skipped: email not configured");
    return;
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NGO_NOTIFICATION_EMAIL,
    subject: `MonBondhu: New Anonymous Help Request (${requestId})`,
    text: `A new anonymous help request was submitted.\n\nRequest ID: ${requestId}\n\nMessage:\n${message}\n\nNote: This message contains no personal identifiers.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("✅ Notification email sent for", requestId);
  } catch (err) {
    console.error("❌ Failed to send notification email:", err.message);
  }
};

// =============== POST /api/help ===================
export const createHelpRequest = async (req, res) => {
  try {
    const { emotion, message, consent = true } = req.body;

    if (!message || !message.trim()) {
      return res.status(400).json({ error: "বার্তা লিখতে হবে।" });
    }

    const requestId = `M3-${nanoid(10)}`;

    const doc = await HelpRequest.create({
      requestId,
      emotion: emotion || null,
      message: message.trim(),
      consent: !!consent,
      synced: true
    });

    sendNotification({ requestId, message: doc.message });

    return res.status(201).json({
      success: true,
      requestId,
      message: "আপনার অনুরোধটি পাঠানো হয়েছে। প্রশিক্ষিত একজন স্বেচ্ছাসেবক আগামী ৪৮ ঘণ্টার মধ্যে আপনার সাথে যোগাযোগ করবেন।"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "সার্ভারে সমস্যা হয়েছে, পরে চেষ্টা করুন।" });
  }
};

// =============== POST /api/help/sync ===================
export const syncHelpRequests = async (req, res) => {
  try {
    const { requests } = req.body;
    if (!Array.isArray(requests) || requests.length === 0) {
      return res.status(400).json({ error: "কোনো অনুরোধ পাওয়া যায়নি।" });
    }

    const results = [];
    for (const r of requests) {
      if (!r.message || !r.message.trim()) {
        results.push({ ok: false, reason: "বার্তা খালি" });
        continue;
      }

      const requestId = `M3-${nanoid(10)}`;
      const doc = await HelpRequest.create({
        requestId,
        emotion: r.emotion || null,
        message: r.message.trim(),
        consent: !!r.consent,
        synced: true
      });

      sendNotification({ requestId, message: doc.message });
      results.push({ ok: true, requestId });
    }

    return res.status(201).json({
      synced: results,
      message: "সব অনুরোধ সফলভাবে জমা হয়েছে।"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "সার্ভারে সমস্যা হয়েছে, পরে চেষ্টা করুন।" });
  }
};

// =============== GET /api/help ===================
export const listHelpRequests = async (req, res) => {
  try {
    const { status, page = 1, limit = 50 } = req.query;
    const filter = {};
    if (status) filter.status = status;

    const skip = (Math.max(1, page) - 1) * Math.max(1, limit);
    const docs = await HelpRequest.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Math.max(1, limit))
      .lean();

    return res.json({
      count: docs.length,
      message: "সব অনুরোধ তালিকা দেখানো হয়েছে।",
      results: docs
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "তথ্য আনা সম্ভব হয়নি।" });
  }
};

// =============== PATCH /api/help/:requestId ===================
export const updateHelpRequest = async (req, res) => {
  try {
    const { requestId } = req.params;
    const { status, assignedTo, contactInfo } = req.body;

    const doc = await HelpRequest.findOne({ requestId });
    if (!doc) return res.status(404).json({ error: "অনুরোধ পাওয়া যায়নি।" });

    if (status) doc.status = status;
    if (assignedTo) doc.assignedTo = assignedTo;
    if (contactInfo) {
      doc.contactInfo = {
        phone: contactInfo.phone || doc.contactInfo.phone,
        email: contactInfo.email || doc.contactInfo.email
      };
    }

    await doc.save();
    return res.json({
      success: true,
      requestId: doc.requestId,
      message: "অনুরোধের অবস্থা সফলভাবে হালনাগাদ করা হয়েছে।"
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "হালনাগাদ ব্যর্থ হয়েছে।" });
  }
};
