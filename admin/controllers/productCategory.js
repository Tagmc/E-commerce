const slugify = require('slugify');
const ProductCategory = require('../models/productCategory');
const asyncHandler = require('express-async-handler');


module.exports.createCategory = asyncHandler(async (req, res) => {
  const response = await ProductCategory.create(req.body);
  return res.json({
    success: response ? true : false,
    createdCategory: response ? response : 'Cannot create new product-category'
  })
});

module.exports.getCategories = asyncHandler(async (req, res) => {
  const response = await ProductCategory.find();
  return res.status(200).json({
    success: response ? true : false,
    productCategories: response ? response : 'Not found'
  })
});

module.exports.updateCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndUpdate(pcid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updatedCategory: response ? response : 'Cannot update category'
  })
});

module.exports.deleteCategory = asyncHandler(async (req, res) => {
  const { pcid } = req.params;
  const response = await ProductCategory.findByIdAndDelete(pcid);
  return res.json({
    success: response ? true : false,
    deletedCategory: response ? response : 'Cannot delete category'
  })
})