const Order = require('../models/order');
const asyncHandler = require('express-async-handler');
const User = require('../models/user');
module.exports.createOrder = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { products, total, address, status } = req.body;
  if (address) {
    await User.findByIdAndUpdate(_id, { address, cart: [] });
  }
  const data = { products, total, orderBy: _id };
  if (status) data.status = status;
  const response = await Order.create(data);
  return res.json({
    success: response ? true : false,
    response: response ? response : 'Cannot create new order'
  })
});


module.exports.updateStatus = asyncHandler(async (req, res) => {
  const { oid } = req.params;
  const { status } = req.body;
  if (!status) throw new Error('Missing status');
  const response = await Order.findByIdAndUpdate(oid, { status }, { new: true });
  return res.json({
    success: response ? true : false,
    response: response ? response : 'Somethings went wrong'
  })
})

module.exports.getUserOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  const { _id } = req.user;
  //Tach cac truong dac biet
  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach(item => delete queries[item]);

  //Format operator of mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, item => `$${item}`);
  const formatQueries = JSON.parse(queryString);
  // let colorQueryObject = {};
  // //Filter
  // if (queries?.title) {
  //   formatQueries.title = { $regex: queries.title, $options: 'i' }
  // }
  // if (queries?.category) { formatQueries.category = { $regex: queries.category, $options: 'i' } }
  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: 'i' } },
  //       { title: { $regex: queries.q, $options: 'i' } },
  //       { category: { $regex: queries.q, $options: 'i' } },
  //       { brand: { $regex: queries.q, $options: 'i' } },
  //       { description: { $regex: queries.q, $options: 'i' } }
  //     ]
  //   }
  // }
  const qr = { ...formatQueries, orderBy: _id };
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
    const orders = await Order
      .find(qr)
      .sort(sortBy == "" ? {} : sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit)

    // Đếm số lượng sản phẩm thỏa mãn điều kiện
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: true,
      orders: orders,
      counts: counts,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: 'Cannot get products',
    });
  }
})

module.exports.getOrders = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tach cac truong dac biet
  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach(item => delete queries[item]);

  //Format operator of mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, item => `$${item}`);
  const formatQueries = JSON.parse(queryString);
  // let colorQueryObject = {};
  // //Filter
  // if (queries?.title) {
  //   formatQueries.title = { $regex: queries.title, $options: 'i' }
  // }
  // if (queries?.category) { formatQueries.category = { $regex: queries.category, $options: 'i' } }
  // let queryObject = {};
  // if (queries?.q) {
  //   delete formatQueries.q;
  //   queryObject = {
  //     $or: [
  //       { color: { $regex: queries.q, $options: 'i' } },
  //       { title: { $regex: queries.q, $options: 'i' } },
  //       { category: { $regex: queries.q, $options: 'i' } },
  //       { brand: { $regex: queries.q, $options: 'i' } },
  //       { description: { $regex: queries.q, $options: 'i' } }
  //     ]
  //   }
  // }
  const qr = { ...formatQueries };
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
    const orders = await Order
      .find(qr)
      .sort(sortBy == "" ? {} : sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit)

    // Đếm số lượng sản phẩm thỏa mãn điều kiện
    const counts = await Order.find(qr).countDocuments();
    return res.status(200).json({
      success: true,
      orders: orders,
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