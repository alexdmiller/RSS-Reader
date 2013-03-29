var sqlite3 = require('sqlite3').verbose();
var FeedRefresher = require('./refresher.js');

var db = new sqlite3.Database('news.db');
var refresher = new FeedRefresher(db);
refresher.readFeeds();