var Post = require('../models/post');
var express = require('express');

function PostController() {
  // ??
}

PostController.prototype.all = function(req, res) {
  Post.all(function(result) {
    res.render('post/list', {posts: result});
  });
};

PostController.prototype.post = function(req, res) {
  Post.find(req.params.id, function(post) {
    res.render('post/show', {post: post});
  });
};

PostController.prototype.category = function(req, res) {

};

PostController.prototype.feed = function(req, res) {

};

PostController.prototype.setCategory = function(req, res) {

};

PostController.prototype.destroy = function(req, res) {
  Post.find(req.params.id, function(post) {
    post.remove(function() {
      res.send('Post removed.');
    });
  });
};

exports.setup = function(app) {
  var controller = new PostController();
  app.get('/post/:id', controller.post);
  app.post('/post/:id/:category', controller.setCategory);
  app.del('/post/:id', controller.destroy);
  app.get('/posts', controller.all);
  app.get('/posts/:category', controller.category);
};