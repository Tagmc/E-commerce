const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const userSchema = new mongoose.Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  mobile: {
    type: String,
    unique: true,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: [1945, 1975],
    default: 1975
  },
  cart: [{
    product: {
      type: mongoose.Types.ObjectId,
      ref: 'Product',
    },
    quantity: Number,
    color: String,
    price: Number,
    thumbnail: String,
    title: String
  }],
  //Bang chua nhung cai id cua address
  address: String,
  wishlist: [{ type: mongoose.Types.ObjectId, ref: 'Product' }],
  isBlocked: {
    type: Boolean,
    default: false
  },
  refreshToken: {
    type: String,
  },
  passwordChangedAt: {
    type: String
  },
  passwordResetToken: {
    type: String
  },
  passwordResetExpires: {
    type: String
  },
  registerToken: {
    type: String
  }
}, {
  timestamps: true
}
);
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods = {
  isCorrectPassword: async function (password) {
    // function in bcrypt to compare password which is entered by users with password which was encoded in db
    return await bcrypt.compare(password, this.password);
  },
  createPasswordChangedToken: function () {

    const resetToken = crypto.randomBytes(32).toString('hex');//convert sang 1 chuoi ki tu tu 0-9  a - h
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
    this.passwordResetExpires = Date.now() + 15 * 60 * 1000;
    return resetToken;
  }
}
module.exports = mongoose.model('User', userSchema);