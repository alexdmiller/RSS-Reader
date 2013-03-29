var sqlite3 = require('sqlite3').verbose();

/**
 * Wrapper for the feeds table in the database.
 */
function Feed(postInfo) {
  this.title = postInfo.title;
  this.body = postInfo.description;
  this.timestamp = postInfo.timestamp;
  this.id = postInfo.post_id;
}

Feed.init = function(db) {
  Feed.db = db;
};

Feed.resetTime = function(callback) {
  Feed.db.run('UPDATE feeds SET last_update = NULL;', callback);
};

exports = module.exports = Feed;