const router = require('express').Router();
const controller = require("../controllers/product");
const { verifyAccessToken, isAdmin } = require("../middlewares/verifyToken");
const uploader = require('../config/cloudinary.config');


router.post('/', verifyAccessToken, isAdmin, uploader.fields([
  { name: 'images', maxCount: 10 },
  { name: 'thumb', maxCount: 1 }
]), controller.createProduct);
router.get('/', controller.getAllProducts);
router.put('/ratings', verifyAccessToken, controller.ratings);
router.put('/uploadimage/:pid', verifyAccessToken, isAdmin, uploader.array('images', 10), controller.uploadImagesProduct);
router.put('/varriants/:pid', verifyAccessToken, isAdmin, uploader.fields([
  { name: 'images', maxCount: 10 },
  { name: 'thumb', maxCount: 1 }
]), controller.addVarriants);
router.put('/:pid', verifyAccessToken, isAdmin, uploader.fields([
  { name: 'images', maxCount: 10 },
  { name: 'thumb', maxCount: 1 }
]), controller.updateProduct);
router.get('/:pid', controller.getProduct);
router.delete('/:pid', verifyAccessToken, isAdmin, controller.delete);


module.exports = router;