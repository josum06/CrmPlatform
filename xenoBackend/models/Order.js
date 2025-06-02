import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
  customerId: mongoose.Schema.Types.ObjectId,
  amount: Number,
},{
    timestamps: true
});

export default mongoose.model('Order', orderSchema);
