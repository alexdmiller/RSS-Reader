var Post = require('../models/post');
var express = require('express');

function PostController() {
  // ??
}

PostController.prototype.all = function(req, res) {
  Post.all(function(result) {
    res.render('posts', {posts: result, message: "hello!"});
  });
};

PostController.prototype.category = function(req, res) {

};

PostController.prototype.feed = function(req, res) {

};

PostController.prototype.unreadForFeed = function(req, res) {

};

PostController.prototype.setCategory = function(req, res) {

};

PostController.prototype.destroy = function(req, res) {

};

exports.setup = function(app) {
  var controller = new PostController();
  app.get('/posts', controller.all);
  app.get('/category', controller.category);
  app.get('/feed', controller.feed);
  app.post('/set_category', controller.setCategory);
  app.destroy('/post', controller.destroy);
};