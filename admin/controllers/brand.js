const slugify = require('slugify');
const Brand = require('../models/brand');
const asyncHandler = require('express-async-handler');


module.exports.createBrand = asyncHandler(async (req, res) => {
  const response = await Brand.create(req.body);
  return res.json({
    success: response ? true : false,
    createdBrand: response ? response : 'Cannot create new brand'
  })
});

module.exports.getBrands = asyncHandler(async (req, res) => {
  const response = await Brand.find();
  return res.json({
    success: response ? true : false,
    brands: response ? response : 'Not found'
  })
});

module.exports.updateBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBrand: response ? response : 'Cannot update brand'
  })
});

module.exports.deleteBrand = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const response = await Brand.findByIdAndDelete(bid);
  return res.json({
    success: response ? true : false,
    deletedBrand: response ? response : 'Cannot delete brand'
  })
})