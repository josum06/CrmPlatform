import mongoose from "mongoose";

const logSchema = new mongoose.Schema({
  campaignId: { type: mongoose.Schema.Types.ObjectId, ref: "Campaign" },
  customerId: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
  status: { type: String, enum: ["SENT", "FAILED"], default: "SENT" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("CommunicationLog", logSchema);
