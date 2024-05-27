module.exports.notFound = (req, res, next) => {
  const error = new Error(`Route ${req.originalUrl} not found`); // Api call by user
  res.status(404);
  next(error);
}

module.exports.errHandler = (error, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode; // neu loi ma 200 thi chuyen thanh 500 loi server conf k giu nguyen statusCode
  return res.status(statusCode).json({
    success: false,
    mes: error?.message
  })
}
