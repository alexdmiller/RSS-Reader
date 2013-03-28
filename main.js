var FeedParser  = require('feedparser'),
    request = require('request'),
    sqlite3 = require('sqlite3').verbose();

var db = new sqlite3.Database('news.db');

function refreshFeeds() {
  // get all of the feeds we subscribe to
  db.each("SELECT * FROM feeds", function(err, row) {
    var lastDate = row.last_update ? new Date(row.last_update) : new Date(0);
    var now = new Date();
    console.log(row.name + ": " + row.last_update);
    request(row.feed_url).pipe(new FeedParser())
      .on('meta', function(meta) {
//        console.log(meta.date);
      })
      .on('article', function(article) {
        // test to see if the date of the article is after the last time
        // we updated. if so, then add the article to our database and mark
        // it as unread.
        var articleDate = new Date(article['atom:updated']['#']);
        if (articleDate > lastDate) {
          console.log("Inserting new article into database.");
          db.run('INSERT into posts (feed_id, title, body, category, timestamp) values' +
            '(?, ?, ?, "unread", ?)', row.feed_id, article.title, article.description, articleDate);
        }
      })
      .on('end', function() {
        console.log(now.getTime());
        db.run('UPDATE feeds SET last_update = datetime(?) WHERE feed_id = ?', now.toISOString(), row.feed_id);
      });
  });
}

refreshFeeds();