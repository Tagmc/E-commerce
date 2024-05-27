const mongoose = require('mongoose');


const couponSchema  = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  }, 
  discount: {
    type: Number,
    required: true
  },
  expiry: {
    type: Date, 
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Coupon', couponSchema);