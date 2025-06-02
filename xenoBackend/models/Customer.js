import mongoose from 'mongoose';

const customerSchema = new mongoose.Schema({
  name: String,
  email: String,
  totalSpend: Number,
  visits: Number,
  lastActive: Date
},{
  timestamps: true}
);

export default mongoose.model('Customer', customerSchema);
