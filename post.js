var sqlite3 = require('sqlite3').verbose();

function Post(postInfo) {
  this.title = postInfo.title;
  this.body = postInfo.body;
  this.timestamp = postInfo.timestamp;
  this.id = postInfo.post_id;
}

// Static
Post.init = function(db) {
  Post.db = db;
};

Post.all = function(callback) {
  Post.db.all('SELECT * FROM posts', function(err, rows) {
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


// Instance
Post.prototype.save = function(callback) {
  // If the post has no ID yet, we need to insert
  // Otherwise we should update
};

Post.prototype.feed = function(callback) {

};

exports = module.exports = Post;