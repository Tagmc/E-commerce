const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    // unique: true,
    required: true,
    lowercase: true
  },
  thumb: {
    type: String,
    required: true
  },
  description: {
    type: Array,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  quantity: {
    type: Number,
    default: 0
  },
  sold: {
    type: Number,
    default: 0
  },
  images: {
    type: Array,
  },
  color: {
    type: String
  },
  ratings: [
    {
      star: {type: Number},
      postedBy: {type: mongoose.Types.ObjectId, ref: 'user'},
      comment: {type: String}
    }
  ],
  totalRatings: {
    type: Number,
    default: 0
  },
  varriants: [
    {
      color: String,
      price: Number,
      thumb: String,
      images: Array,
      title: String,
      sku: String
    }
  ]
}, {
  timestamps: true
})

module.exports = mongoose.model('Product', productSchema);