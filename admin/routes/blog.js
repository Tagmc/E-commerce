const router = require('express').Router();
const controller = require('../controllers/blog');
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken');
const uploader = require('../config/cloudinary.config');

router.get('/', controller.getBlogs);
router.post('/', verifyAccessToken, isAdmin, controller.createBlog);
router.get('/one/:bid', controller.getBlog);
router.put('/like/:bid', verifyAccessToken, controller.likeBlog);
router.put('/dislike/:bid', verifyAccessToken, controller.dislikeBlog);
router.put('/image/:bid', verifyAccessToken, isAdmin, uploader.single('image'), controller.uploadImagesBlog);
router.put('/:bid', verifyAccessToken, isAdmin, controller.updateBlog);
router.delete('/:bid', verifyAccessToken, isAdmin, controller.deleteBlog);


module.exports = router;