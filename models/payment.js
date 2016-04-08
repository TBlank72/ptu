var mongoose = require('mongoose');

var paymentSchema = new mongoose.Schema({
  event_Obj_id: { type: String, unique: true },
  created_on: Date,
  event_type: String,
  cert: String,
  //success: Boolean, use event type
  amount: Number,
  user_email: String,
  user_id: String
}, { timestamps: true });

var Payment = mongoose.model('Payment', paymentSchema);

module.exports = Payment;
