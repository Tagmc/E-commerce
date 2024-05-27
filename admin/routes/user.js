const router = require('express').Router();
const controller = require("../controllers/user");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");


router.post('/register', controller.register);
router.post('/mock', controller.createUsers);
router.get('/final-register/:token', controller.finalRegister);
router.post('/login', controller.login);
router.get('/current', verifyAccessToken, controller.getCurrent);
router.post('/refreshAccessToken', controller.refreshAccessToken);
router.post('/logout', verifyAccessToken, controller.logout);
router.post('/forgot-password', controller.forgotPassword);
router.put('/reset-password', controller.resetPassword);
router.get('/', verifyAccessToken, isAdmin, controller.getUsers);
router.put('/current', verifyAccessToken, controller.update);
router.put('/address', verifyAccessToken, isAdmin, controller.updateUserAddress);
router.put('/cart', verifyAccessToken, controller.updateCart);
router.delete('/:uid', verifyAccessToken, isAdmin, controller.delete);
router.put('/wishlist/:pid', verifyAccessToken, controller.updateWishList);
router.delete('/remove-cart/:pid/:color', verifyAccessToken, controller.removeProductInCart);
router.put('/:uid', verifyAccessToken, isAdmin, controller.updateUserByAdmin);


module.exports = router; 