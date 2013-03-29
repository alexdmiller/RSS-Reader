var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var app = express();

var FeedRefresher = require('./refresher.js');
var Post = require('./post.js');

// create database and initialize modules
var db = new sqlite3.Database('news.db');
var refresher = new FeedRefresher(db);

Post.init(db);

// check for new posts every 10 seconds
refresher.forceRefresh();
refresher.start(100000);

// web app
app.set('view engine', 'ejs');

app.get('/posts', function(req, res) {
  Post.all(function(result) {
    res.render('posts', {posts: result});
  });
});

app.listen(3000);