var FeedParser  = require('feedparser'),
    request = require('request'),
    sqlite3 = require('sqlite3').verbose(),
    Post = require('../models/post');


function FeedRefresher(db) {
  this.db = db;
}

FeedRefresher.prototype.start = function(interval) {
  this.timer = setInterval(this.readFeeds, interval, this.db);
};

FeedRefresher.prototype.forceRefresh = function() {
  this.readFeeds(this.db);
};

FeedRefresher.prototype.readFeeds = function(db) {
  // get all of the feeds we subscribe to
  db.each("SELECT * FROM feeds", function(err, row) {
    console.log("refreshing " + row.feed_url);
    var lastDate = row.last_update ? new Date(row.last_update) : new Date(0);
    var now = new Date();
    request(row.feed_url).pipe(new FeedParser())
      .on('article', function(article) {
        // test to see if the date of the article is after the last time
        // we updated. if so, then add the article to our database and mark
        // it as unread.
        var articleDate = new Date(article['atom:updated']['#']);
        if (articleDate > lastDate) {
          var post = new Post({
            title: article.title,
            body: article.description,
            timestamp: articleDate,
            feed_id: row.feed_id
          });
          post.save();
        }
      })
      .on('end', function() {
        db.run('UPDATE feeds SET last_update = datetime(?) WHERE feed_id = ?', now.toISOString(), row.feed_id);
      });
  });
};

exports = module.exports = FeedRefresher;