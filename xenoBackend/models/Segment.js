import mongoose from 'mongoose';

const segmentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruleGroup: { type: Object, required: true }
}, { timestamps: true });

export default mongoose.model('Segment', segmentSchema);
