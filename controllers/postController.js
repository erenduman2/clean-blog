const Post = require('../models/Post');

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render('post', {
    post: post,
  });
};

exports.updatePost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  post.name = req.body.name;
  post.message = req.body.message;
  post.save();
  res.redirect('/');
};

exports.createPost = async (req, res) => {
  // console.log("asd",req.body);
  await Post.create(req.body);
  res.redirect('/');
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect('/');
};

