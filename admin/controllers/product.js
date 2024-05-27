const Product = require("../models/product");
const asyncHandler = require('express-async-handler');
const slugify = require('slugify');
const { v4: uuidv4 } = require('uuid');
module.exports.createProduct = asyncHandler(async (req, res) => {
  const { title, price, description, brand, category, color } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req.files?.images?.map(item => item.path);
  if (!(title && price && description && brand && category && color)) throw new Error('Missing Inputs');
  req.body.slug = slugify(title);
  if (thumb) req.body.thumb = thumb;
  if (images) req.body.images = images;
  const newProduct = await Product.create(req.body);
  return res.status(200).json({
    success: newProduct ? true : false,
    mes: newProduct ? 'Create product is successful' : 'Cannot create new product'
  })
});

module.exports.getProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const product = await Product.findById(pid);
  return res.status(200).json({
    success: product ? true : false,
    productData: product ? product : 'Cannot get product'
  })
});

module.exports.getAllProducts = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tach cac truong dac biet
  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach(item => delete queries[item]);

  //Format operator of mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, item => `$${item}`);
  const formatQueries = JSON.parse(queryString);
  let colorQueryObject = {};
  //Filter
  if (queries?.title) {
    formatQueries.title = { $regex: queries.title, $options: 'i' }
  }
  if (queries?.category) { formatQueries.category = { $regex: queries.category, $options: 'i' } }
  if (queries?.brand) { formatQueries.brand = { $regex: queries.brand, $options: 'i' } }
  if (queries?.color) {
    delete formatQueries.color;
    const colorArr = queries.color?.split(',');
    const colorQuery = colorArr.map(item => ({ color: { $regex: item, $options: 'i' } }));
    colorQueryObject = { $or: colorQuery };
  }
  let queryObject = {};
  if (queries?.q) {
    delete formatQueries.q;
    queryObject = {
      $or: [
        { color: { $regex: queries.q, $options: 'i' } },
        { title: { $regex: queries.q, $options: 'i' } },
        { category: { $regex: queries.q, $options: 'i' } },
        { brand: { $regex: queries.q, $options: 'i' } },
        { description: { $regex: queries.q, $options: 'i' } }
      ]
    }
  }
  const qr = { ...formatQueries, ...colorQueryObject, ...queryObject };
  //Sort
  let sortBy = "";
  if (req.query.sort) {
    sortBy = req.query.sort.split(',').join(' ');
  }
  let fields = "";
  if (req.query.fields) {
    fields = req.query.fields;
  }
  //pagination
  // + to convert Number
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  try {
    // Tìm kiếm sản phẩm theo điều kiện
    const products = await Product
      .find(qr)
      .sort(sortBy == "" ? {} : sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit)

    // Đếm số lượng sản phẩm thỏa mãn điều kiện
    const counts = await Product.find(qr).countDocuments();
    return res.status(200).json({
      success: true,
      products: products,
      counts: counts,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: 'Cannot get products',
    });
  }
});

module.exports.updateProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const files = req?.files;
  console.log(files?.thumb);
  if (files?.thumb) {
    req.body.thumb = files?.thumb[0]?.path;

  }
  if (files?.images) {
    req.body.images = files?.images?.map(item => item.path);
  }

  if (req.body && req.body.title) req.body.slug = slugify(req.body.title);
  const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true });
  return res.status(200).json({
    success: updatedProduct ? true : false,
    mes: updatedProduct ? 'This product is updated' : 'Cannot update product'
  })
});

module.exports.delete = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const deleteProduct = await Product.findByIdAndDelete(pid);
  return res.status(200).json({
    success: deleteProduct ? true : false,
    mes: deleteProduct ? 'Deleted' : 'Cannot delete product'
  })
});

module.exports.ratings = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, comment, pid } = req.body;
  if (!star || !pid) throw new Error('Missing inputs');
  const ratingProduct = await Product.findById(pid);
  const alreadyRating = ratingProduct?.ratings?.find(item => item.postedBy.toString() === _id);
  if (alreadyRating) {
    await Product.updateOne({
      ratings: { $elemMatch: alreadyRating }
    }, {
      //$ la cai ele nao match vs ele ben tren
      $set: { "ratings.$.star": star, "ratings.$.comment": comment }
    }, { new: true })
  } else {
    await Product.findByIdAndUpdate(pid, {
      $push: { ratings: { star: star, comment: comment, postedBy: _id } }
    }, { new: true })
  }
  //Total  ratings
  const updateProduct = await Product.findById(pid);
  const ratingCount = updateProduct.ratings.length
  const sumRatings = updateProduct.ratings.reduce((sum, item) => sum + +item.star, 0);
  updateProduct.totalRatings = Math.round(sumRatings * 10 / ratingCount) / 10;
  await updateProduct.save();
  return res.status(200).json({
    status: true,
    updateProduct: updateProduct
  })
});

module.exports.uploadImagesProduct = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  if (!req.files) throw new Error('Missing input');
  const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(item => item.path) } } }, { new: true });
  return res.json({
    success: response ? true : false,
    updatedProduct: response ? response : 'Cannot upload images product'
  });
});

module.exports.addVarriants = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { title, price, color } = req.body;
  const thumb = req?.files?.thumb[0]?.path;
  const images = req.files?.images?.map(item => item.path);
  if (!(title && price && color)) throw new Error('Missing Inputs');
  const response = await Product.findByIdAndUpdate(pid, { $push: { varriants: { color, price, title, thumb, images, sku: uuidv4() } } }, { new: true });
  return res.json({
    success: response ? true : false,
    response: response ? response : 'Cannot add varriants'
  })

});
