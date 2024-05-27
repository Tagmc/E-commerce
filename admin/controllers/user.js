const User = require('../models/user');
const asyncHandler = require('express-async-handler');
const { generateAccessToken, generateRefreshToken } = require("../middlewares/jwt");
const jwt = require("jsonwebtoken");
const { sendMail } = require('../utils/sendMail');
const crypto = require('crypto');
const { v4: makeToken } = require('uuid');
const { users } = require('../utils/constant');
// module.exports.register = asyncHandler(async (req, res) => {
//   const { email, password, firstname, lastname, mobile } = req.body;
//   if (!email || !password || !lastname || !firstname || !mobile) {
//     return res.status(400).json({
//       success: false,
//       mes: "Missing Input",
//     });
//   }
//   const token = makeToken();
//   res.cookie('dataregister', {...req.body, token}, {  maxAge: 5 * 60 * 1000 });
//   const html = `Please Click on link below to verify your account.<a href ='https://e-commerce-vert-beta.vercel.app/api/user/final-register/${token}'>Click Here</a>`;
//   await sendMail({email, html, subject: 'Complete register!'})
//   const user = await User.findOne({ email: email });
//   if (user) {
//     throw new Error('User has existed');
//   } else {
//     const newUser = await User.create(req.body);
//     return res.status(200).json({
//       success: newUser ? true : false,
//       mes: newUser ? 'Register is successful. Please go login' : "Something went wrong"
//     })
//   }
// });
module.exports.register = asyncHandler(async (req, res) => {
  const { email, password, firstname, lastname, mobile } = req.body;
  if (!email || !password || !lastname || !firstname || !mobile) {
    return res.status(400).json({
      success: false,
      mes: "Missing Input",
    });
  }
  const user = await User.findOne({ email: email });
  if (user) {
    throw new Error('User has existed');
  } else {
    const token = makeToken();
    res.cookie('dataregister', { ...req.body, token }, { httpOnly: true, maxAge: 15 * 60 * 1000 });
    const html = `Please Click on link below to verify your account.<a href ='${process.env.URL_SERVER}/api/user/final-register/${token}'>Click Here</a>`;
    await sendMail({ email, html, subject: 'Complete register!' })
    return res.json({
      success: true,
      mes: "Please check your email to active account"
    });
  }
});

module.exports.finalRegister = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  const { token } = req.params;
  if (!cookie || cookie?.dataregister?.token !== token) {
    res.clearCookie('dataregister');
    return res.redirect(`${process.env.CLIENT_URL}/final-register/fail`);
  }
  const newUser = await User.create({
    email: cookie?.dataregister?.email,
    password: cookie?.dataregister?.password,
    mobile: cookie?.dataregister?.mobile,
    firstname: cookie?.dataregister?.firstname,
    lastname: cookie?.dataregister?.lastname,
  });
  res.clearCookie('dataregister');
  if (newUser) return res.redirect(`${process.env.CLIENT_URL}/final-register/success`);
  else return res.redirect(`${process.env.CLIENT_URL}/final-register/fail`);
  return res.status(200).json({
    success: newUser ? true : false,
    mes: newUser ? 'Register is successful. Please go login' : "Something went wrong"
  })
});


// Refresh Token to renew accessToken
//AccessToken to credentials User and authentication user
module.exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      mes: "Missing Input",
    });
  }
  const response = await User.findOne({ email: email });
  // add await because response.isCorrectPassword(password) is Promise.
  if (response && await response.isCorrectPassword(password)) {
    //mongodb return one special object so Using toObject to convert object in mongo to plain object
    const { password, role, refreshToken, ...userData } = response.toObject();
    const accessToken = generateAccessToken(response._id, role);
    const newRefreshToken = generateRefreshToken(response._id);
    //new: true to return new Data after Updated
    await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true });
    //Save token in cookie (key, value, options)
    res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 });
    return res.status(200).json({
      success: true,
      accessToken,
      userData
    })
  } else {
    res.json({
      success: false,
      mes: 'Email or password is not correct'
    })
  }
});

module.exports.getCurrent = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const user = await User.findById(_id).select('-refreshToken -password').populate({
    path: 'cart',
    populate: {
      path: 'product',
      select: 'title thumb price'
    }
  }).populate('wishlist', 'title thumb price color totalRatings');
  return res.status(200).json({
    success: user ? true : false,
    result: user ? user : 'User not found'
  })
});


module.exports.refreshAccessToken = asyncHandler(async (req, res) => {
  // Get refreshToken from Cookies
  const cookie = req.cookies;
  //Check Token 's Exist
  if (!cookie && !cookie.refreshToken) throw new Error('No refresh token in cookie');
  //Check 
  const rs = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET);
  const response = await User.findOne({ _id: rs._id, refreshToken: cookie.refreshToken });
  return res.status(200).json({
    success: response ? true : false,
    newAcceptToken: response ? generateAccessToken(response._id, response.role) : 'RefreshToken Invalid'
  })
});


module.exports.logout = asyncHandler(async (req, res) => {
  const cookie = req.cookies;
  //When loged in but cookies has't saved refreshToken
  if (!cookie || !cookie.refreshToken) throw new Error("No refreshToken in cookies");
  //Delete acceptToken in DB
  await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true });
  res.clearCookie('refreshToken', {
    httpOnly: true,
    secure: true
  });
  return res.status(200).json({
    success: true,
    mes: 'LogOut is done'
  })
});
//Client send email which was registered
//Server check email, if valid -> send email enclose link(password change token)
//Client check email => click link
//Client send api with token
//Server check token 
// if OK => change password

module.exports.forgotPassword = asyncHandler(async (req, res) => {
  const { email } = req.body;
  if (!email) throw new Error('Missing email');
  const user = await User.findOne({ email: email });
  if (!user) throw new Error('User not found');
  const resetToken = user.createPasswordChangedToken();
  await user.save();

  const html = `Please Click on link below to change password.<a href ='${process.env.CLIENT_URL}/reset-password/${resetToken}'>Click Here</a>`;
  const data = {
    email: email,
    html: html,
    subject: 'Forgot password'
  }
  const result = await sendMail(data);
  return res.status(200).json({
    success: true,
    result: result
  })
});
//get token 
module.exports.resetPassword = asyncHandler(async (req, res) => {
  const { password, token } = req.body;
  if (!password || !token) throw new Error('Missing input');
  const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex');
  const user = await User.findOne({ passwordResetToken: passwordResetToken, passwordResetExpires: { $gt: Date.now() } });
  if (!user) throw new Error('Invalid reset token');
  user.password = password;
  user.passwordResetToken = undefined;
  user.passwordChangedAt = Date.now();
  user.passwordResetExpires = undefined;
  await user.save();
  return res.status(200).json({
    success: user ? true : false,
    mes: user ? 'updated password' : 'something went wrong'
  })
});

module.exports.getUsers = asyncHandler(async (req, res) => {
  const queries = { ...req.query };
  //Tach cac truong dac biet
  const excludeFields = ['limit', 'sort', 'page', 'fields'];
  excludeFields.forEach(item => delete queries[item]);

  //Format operator of mongoose
  let queryString = JSON.stringify(queries);
  queryString = queryString.replace(/\b(gt|gte|lt|lte)\b/g, item => `$${item}`);
  const formatQueries = JSON.parse(queryString);
  //Filter
  if (queries?.name) {
    formatQueries.name = { $regex: queries.name, $options: 'i' }
  }
  //Sort
  let sortBy = "";
  if (req.query.sort) {
    sortBy = req.query.sort.split(',').join(' ');
  }
  let fields = "";
  if (req.query.fields) {
    fields = req.query.fields;
  }
  if (req.query.q) {
    delete formatQueries.q;
    formatQueries['$or'] = [
      {
        firstname: { $regex: req.query.q, $options: 'i' },
      },
      {
        lastname: { $regex: req.query.q, $options: 'i' },
      },
      {
        email: { $regex: req.query.q, $options: 'i' },
      }
    ]
  }
  console.log(formatQueries);
  //pagination
  // + to convert Number
  const page = +req.query.page || 1;
  const limit = +req.query.limit || process.env.LIMIT_PRODUCTS;
  const skip = (page - 1) * limit;
  try {
    // Tìm kiếm sản phẩm theo điều kiện
    const users = await User
      .find(formatQueries)
      .sort(sortBy == "" ? {} : sortBy)
      .select(fields)
      .skip(skip)
      .limit(limit)

    // Đếm số lượng sản phẩm thỏa mãn điều kiện
    const counts = await User.find(formatQueries).countDocuments();
    return res.status(200).json({
      success: true,
      users: users,
      counts: counts,
    });
  } catch (error) {
    // Xử lý lỗi nếu có
    return res.status(500).json({
      success: false,
      error: 'Cannot get users',
    });
  }
})

module.exports.delete = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  const response = await User.findByIdAndDelete(uid);
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? `User with email ${response.email} deleted` : `No user deleted`
  })
});

module.exports.update = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { firstname, lastname, email, mobile, address } = req.body;
  const data = { firstname, lastname, email, mobile, address };
  if (!_id || Object.keys(req.body).length === 0) throw new Error('Missing input');
  const response = await User.findByIdAndUpdate({ _id: _id }, data, { new: true }).select('-password -role -refreshToken');
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'Update is successful' : `No user updated`
  })
});

module.exports.updateUserByAdmin = asyncHandler(async (req, res) => {
  const { uid } = req.params;
  if (Object.keys(req.body).length === 0) throw new Error('Missing input');
  const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken');
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'Updated' : `Something went wrong`
  })
});


module.exports.updateUserAddress = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  if (!req.body.address) throw new Error('Missing input');
  const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true }).select('-password -role -refreshToken');
  return res.json({
    success: response ? true : false,
    updateUser: response ? response : 'Something went wrong'
  })
});

module.exports.updateCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, quantity = 1, color, price, thumbnail, title } = req.body;
  if (!pid || !color) throw new Error('Missing input');
  const user = await User.findById(_id).select('cart');
  const alreadyProduct = user?.cart?.find(item => item.product.toString() === pid && item.color === color);
  if (alreadyProduct) {
    const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": quantity, "cart.$.price": price, "cart.$.thumbnail": thumbnail, "cart.$.title": title } }, { new: true });
    return res.json({
      success: response ? true : false,
      mes: response ? 'Updated' : 'Something went wrong'
    });
  } else {
    const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color, price, thumbnail, title } } }, { new: true });
    return res.status(200).json({
      success: response ? true : false,
      mes: response ? 'Updated' : 'Something went wrong'
    });
  }
});

module.exports.removeProductInCart = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { pid, color } = req.params;
  const user = await User.findById(_id).select('cart');
  const alreadyProduct = user?.cart?.find(item => item.product.toString() === pid && item.color === color);
  if (!alreadyProduct) {
    return res.json({
      success: true,
      mes: 'Updated your cart'
    });
  }
  const response = await User.findByIdAndUpdate(_id, { $pull: { cart: { product: pid, color: color } } }, { new: true });
  return res.status(200).json({
    success: response ? true : false,
    mes: response ? 'Remove item is successful' : 'Something went wrong'
  });
});

module.exports.createUsers = asyncHandler(async (res, req) => {
  const response = await User.create(users);
  return res.json({
    success: response ? true : false,
    users: response ? response : 'Something went wrong'
  })
});

module.exports.updateWishList = asyncHandler(async (req, res) => {
  const { pid } = req.params;
  const { _id } = req.user;
  const user = await User.findById(_id);
  const alreadyWishList = user.wishlist?.find(el => el.toString() === pid);
  if (alreadyWishList) {
    const response = await User.findByIdAndUpdate(
      _id,
      { $pull: { wishlist: pid } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      mes: response ? 'Updated your wishlist' : 'Fail to update your wishlist'
    });
  } else {
    const response = await User.findByIdAndUpdate(
      _id,
      { $push: { wishlist: pid } },
      { new: true }
    );
    return res.json({
      success: response ? true : false,
      mes: response ? 'Updated your wishlist' : 'Fail to update your wishlist'
    });
  }
});
