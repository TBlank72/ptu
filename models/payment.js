var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
  event_Obj_id: { type: String, unique: true },
  created_on: Date,
  event_type: String,
  cert: String,
  amount: Number,
  user_email: String,
}, { timestamps: true });

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
