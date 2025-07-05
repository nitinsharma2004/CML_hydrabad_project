const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
  razorpay_order_id: {
    type: String,
    required: true,
    unique: true,
  },
  razorpay_payment_id: {
    type: String,
   index: { unique: true, sparse: true }
  },
  razorpay_signature: {
    type: String,
  //  required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'INR',
  },
  status: {
    type: String,
    required: true,
    enum: ['created', 'verified', 'failed'],
    default: 'created',
  },
  tags: {
    type: String,
    enum: ["fertilizers", "disasters", "tools", "others"]
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', paymentSchema); 