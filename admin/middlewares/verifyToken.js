const jwt = require('jsonwebtoken');
const asyncHandler = require("express-async-handler");

module.exports.verifyAccessToken = asyncHandler(async (req, res, next) => {
  // Bearer token (example)
  //headers: {authorization: Bearer token}
  if (req?.headers?.authorization?.startsWith('Bearer')) {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
      if (err) {
        //401 loi khong xac thuc  
        return res.status(401).json({
          success: false,
          mes: 'Invalid access token'
        });
      }
      console.log(decode);
      req.user = decode;
      next();
    });
  } else {
    return res.status(401).json({
      success: false,
      mes: 'Required authenticate'
    });
  }
});

module.exports.isAdmin = asyncHandler((req, res, next) => {
  const { role } = req.user;
  if (+role !== 1945)
    return res.status(401).json({
      success: false,
      mes: 'REQUIRE ADMIN ROLE'
    });
  next();
});