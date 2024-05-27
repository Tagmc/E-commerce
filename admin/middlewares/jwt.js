const jwt = require("jsonwebtoken");

module.exports.generateAccessToken = (userId, role) => jwt.sign({ _id: userId, role }, process.env.JWT_SECRET, { expiresIn: '3d' });

module.exports.generateRefreshToken = (userId) => jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });



