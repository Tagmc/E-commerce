const Coupon = require('../models/coupon');
const asyncHandler = require('express-async-handler');

module.exports.createCoupon = asyncHandler(async (req, res) => {
  const { name, discount, expiry } = req.body;
  if (!name || !discount || !expiry) throw new Error('Missing input');
  const coupon = await Coupon.create({
    ...req.body,
    expiry: Date.now() + +expiry * 24 * 60 * 60 * 1000
  });
  return res.json({
    success: coupon ? true : false,
    createdCoupon: coupon ? coupon : 'Cannot create coupon'
  })
});

module.exports.getCoupons = asyncHandler(async (req, res) => {
  const coupon = await Coupon.find().select("-createdAt -updatedAt");
  return res.json({
    success: coupon ? true : false,
    createdCoupon: coupon ? coupon : 'Cannot get coupon'
  })
});

module.exports.updateCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error('Missing input');
  if (req.body.expiry) req.body.expiry = Date.now() + +req.body.expiry * 24 * 60 * 60 * 1000;
  const coupon = await Coupon.findByIdAndUpdate(cid, req.body, { new: true });
  return res.json({
    success: coupon ? true : false,
    updatedCoupon: coupon ? coupon : 'Cannot update coupon'
  })
});

module.exports.deleteCoupon = asyncHandler(async (req, res) => {
  const { cid } = req.params;
  const coupon = await Coupon.findByIdAndDelete(cid);
  return res.json({
    success: coupon ? true : false,
    deletedCoupon: coupon ? coupon : 'Cannot delete coupon'
  })
});