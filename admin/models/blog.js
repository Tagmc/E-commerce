const mongoose = require('mongoose');

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true
  },
  numberViews: {
    type: Number,
    default: 0
  },
  likes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  dislikes: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'User'
    }
  ],
  image: {
    type: String,
    default: 'https://img.freepik.com/free-photo/office-table-with-cup-coffee-keyboard-notepad_1220-4617.jpg'
  },
  author: {
    type: String,
    default: 'Admin'
  }
}, {
  timestamps: true,
  // toJSON trong ham controller khi res.json ve se gui dc du lieu trong do
  //toObject la lay du lieu gui ra do theo Object
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});
module.exports = mongoose.model('Blog', blogSchema);