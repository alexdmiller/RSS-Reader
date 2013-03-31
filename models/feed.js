var sqlite3 = require('sqlite3').verbose();

/**
 * Wrapper for the feeds table in the database.
 */
function Feed(postInfo) {
  this.title = feedInfo.title;
  this.body = feedInfo.description;
  this.timestamp = feedInfo.timestamp;
  this.id = feedInfo.post_id;
}

Feed.init = function(db) {
  Feed.db = db;
};

Feed.resetTime = function(callback) {
  Feed.db.run('UPDATE feeds SET last_update = NULL;', callback);
};

Feed.find = function(id, callback) {
  Feed.db.run('SELECT * FROM feeds WHERE feed_id = ?', id, function(err, row) {
    var feed = new Feed();
  });
};

exports = module.exports = Feed;