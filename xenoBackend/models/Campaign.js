import mongoose from "mongoose";

const campaignSchema = new mongoose.Schema({
  segmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Segment" },
  message: String,
  stats: {
    sent: Number,
    failed: Number,
    total: Number,
  },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("Campaign", campaignSchema);
