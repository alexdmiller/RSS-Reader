var sqlite3 = require('sqlite3').verbose();
var express = require('express');
var app = express();

var FeedRefresher = require('./controllers/refresher.js');
var Post = require('./models/post.js');
var Feed = require('./models/feed.js');

// create database and initialize modules
// TODO: factor out database name into config file
// TODO: on startup, initialize database if it has not been created already
var db = new sqlite3.Database('news.db');
var refresher = new FeedRefresher(db);

Post.init(db);
Feed.init(db);

if (process.argv[2] == "reset") {
  console.log("resetting...");
  Post.clear(function() {
    Feed.resetTime(function() {
      console.log("posts deleted and feed times reset.");
      main();
    });
  });
} else {
  main();
}

function main() {
  // check for new posts every 10 seconds
  console.log("starting refresher.");
  refresher.forceRefresh();
  refresher.start(100000);

  // web app
  var controllers = ['post_controller'];
  controllers.forEach(function(item) {
    var controller = require('./controllers/' + item);
    controller.setup(app);
  });
  app.set('view engine', 'ejs');
  console.log("starting web app on port " + 3000  + ".");
  // TODO: factor our port into config file
  app.listen(3000);
}