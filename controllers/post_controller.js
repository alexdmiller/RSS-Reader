var Post = require('../models/post');
var express = require('express');

function PostController() {
  
}

PostController.prototype.all = function(err, res) {
  Post.all(function(result) {
    res.render('posts', {posts: result, message: "hello!"});
  });
};

exports.setup = function(app) {
  var controller = new PostController();
  app.get('/posts', controller.all);
};