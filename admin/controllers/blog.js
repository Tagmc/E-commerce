const Blog = require('../models/blog');
const asyncHandler = require('express-async-handler');

module.exports.createBlog = asyncHandler(async (req, res) => {
  const { title, description, category } = req.body;
  if (!title || !description || !category) {
    throw new Error('Missing inputs');
  }
  const response = await Blog.create(req.body);
  return res.json({
    success: response ? true : false,
    createBlog: response ? response : 'Cannot create new blog'
  });
});

module.exports.updateBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (Object.keys(req.body).length === 0) {
    throw new Error('Missing inputs');
  }
  const response = await Blog.findByIdAndUpdate(bid, req.body, { new: true });
  return res.json({
    success: response ? true : false,
    updateBlog: response ? response : 'Cannot update blog'
  });
});

module.exports.getBlogs = asyncHandler(async (req, res) => {
  const response = await Blog.find();
  return res.json({
    success: response ? true : false,
    blogs: response ? response : 'Cannot get blog'
  });
});

/* As User likes a Blog: 
  + Does user dislike blog? => as user like blog, unenable dislike
  + Dose user like blog? => as user like blog, unenable like/ enable like*/

module.exports.likeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error('Missing inputs');
  const blog = await Blog.findById(bid);
  const alreadyDisliked = blog?.dislikes?.find(item => item.toString() === _id);
  if (alreadyDisliked) {
    const response = await Blog.findByIdAndUpdate(bid, {
      $pull: { dislikes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  }
  const isLiked = blog?.likes?.find(item => item.toString() === _id);;
  if (isLiked) {
    const response = await Blog.findByIdAndUpdate(bid, {
      $pull: { likes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, {
      $push: { likes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  }
});


module.exports.dislikeBlog = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { bid } = req.params;
  if (!bid) throw new Error('Missing inputs');
  const blog = await Blog.findById(bid);
  const alreadyLiked = blog?.likes?.find(item => item.toString() === _id);
  if (alreadyLiked) {
    const response = await Blog.findByIdAndUpdate(bid, {
      $pull: { likes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  }
  const isDisliked = blog?.dislikes?.find(item => item.toString() === _id);;
  if (isDisliked) {
    const response = await Blog.findByIdAndUpdate(bid, {
      $pull: { dislikes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  } else {
    const response = await Blog.findByIdAndUpdate(bid, {
      $push: { dislikes: _id },
    }, {
      new: true
    });
    return res.json({
      success: response ? true : false,
      response: response
    });
  }
});

module.exports.getBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true })
    .populate('likes', 'firstname lastname')
    .populate('dislikes', 'firstname lastname');
  return res.json({
    success: blog ? true : false,
    blog: blog
  })
});

module.exports.deleteBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  const blog = await Blog.findByIdAndDelete(bid)
  return res.json({
    success: blog ? true : false,
    blog: blog || 'Somethigns went wrong'
  })
});

module.exports.uploadImagesBlog = asyncHandler(async (req, res) => {
  const { bid } = req.params;
  if (!req.file) throw new Error('Missing input');
  const response = await Blog.findByIdAndUpdate(bid, {image: req.file.path}, { new: true });
  return res.json({
    success: response ? true : false,
    updatedBlog: response ? response : 'Cannot upload images blog'
  });
});