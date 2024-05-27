const mongoose = require('mongoose');


const roleSchema  = new mongoose.Schema({
  code : {
    type: String,
    required: true,
    unique: true,
    index: true
  },
  value: {
    type: String,
    required: true,
    unique: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Role', roleSchema);