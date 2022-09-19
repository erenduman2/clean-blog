const Post = require('../models/Post');

exports.getIndexPage = async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts: posts,
  });
};

exports.getAboutPage = (req, res) => {
  console.log(req.body);
  res.render('about');
};

exports.getAddPage = (req, res) => {
  res.render('add_post');
};

exports.getPostPage = (req, res) => {
  res.render('post');
};

exports.getEditPage = async (req, res) => {
  const post = await Post.findById(req.params.id);
  // console.log(post);
  res.render('edit', {
    post: post,
  });
};

