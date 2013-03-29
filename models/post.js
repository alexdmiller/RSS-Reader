var sqlite3 = require('sqlite3').verbose();

/**
 * Wrapper for the posts table in the database.
 */
function Post(postInfo) {
  this.title = postInfo.title;
  this.body = postInfo.body;
  this.timestamp = postInfo.timestamp;
  this.id = postInfo.post_id;
}

Post.init = function(db) {
  Post.db = db;
};

Post.clear = function(callback) {
  Post.db.run("DELETE FROM posts", callback);
};

Post.all = function(callback) {
  Post.db.all('SELECT * FROM posts ORDER BY timestamp DESC', function(err, rows) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      result.push(new Post(rows[i]));
    }
    callback(result);
  });
};

Post.category = function(category, callback) {
  Post.db.all('SELECT * FROM posts WHERE category = ?', category, function(err, rows) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      result.push(new Post(rows[i]));
    }
    callback(result);
  });
};

Post.postsFromFeed = function(feed, callback) {
  var feed_id = feed.id;
  Post.db.all('SELECT * FROM posts WHERE feed_id = ?', feed_id, function(err, rows) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      result.push(new Post(rows[i]));
    }
    callback(result);
  });
};

Post.categoryPostsFromFeed = function(category, feed, callback) {
  var feed_id = feed.id;
  Post.db.all('SELECT * FROM posts WHERE feed_id = ? AND category = ?', feed_id, category,
      function(err, rows) {
    var result = [];
    for (var i = 0; i < rows.length; i++) {
      result.push(new Post(rows[i]));
    }
    callback(result);
  });
};

Post.unread = function(callback) {
  Post.category('unread', callback);
};

// TODO: what happens if a post has an ID, but the ID doesn't match up
// with anything in the database.
Post.prototype.save = function(callback) {
  // If the post has no ID yet, we need to insert
  var that = this;
  if (this.id === undefined) {
    Post.db.run('INSERT into posts (feed_id, title, body, category, timestamp) values' +
        '(?, ?, ?, "unread", ?)', this.feed_id, this.title, this.body, this.timestamp,
        function() {
          that.id = this.lastID;
          callback();
        });
  } else {
    // Otherwise we should update
    Post.db.execute('UPDATE posts SET title = ?, body = ?, category = ?, timestamp = ?' +
        'WHERE post_id = ?', this.title, this.body, this.category, this.timestamp, this.id);
  }
};

Post.prototype.remove = function(callback) {
  // TODO
};

Post.prototype.feed = function(callback) {
  // TODO
};

exports = module.exports = Post;