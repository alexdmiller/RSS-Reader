var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var app = express();

var FeedRefresher = require('./controllers/refresher.js');
var Post = require('./models/post.js');

// create database and initialize modules
var db = new sqlite3.Database('news.db');
var refresher = new FeedRefresher(db);

Post.init(db);

// check for new posts every 10 seconds
refresher.forceRefresh();
refresher.start(100000);

var controllers = ['post_controller'];
controllers.forEach(function(item) {
  var controller = require('./controllers/' + item);
  controller.setup(app);
});

// web app
app.set('view engine', 'ejs');
app.listen(3000);