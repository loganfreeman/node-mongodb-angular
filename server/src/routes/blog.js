'use strict';

var mongoUtil = require('../mongoose/utils.js');

var db = mongoUtil.connect();

var Blog = db.model('BlogPost');

var auth = require('../auth.js');

var blogs = {};

/**
 * Find blog by id
 */
blogs.blog = function(req, res, next, id) {
  Blog.load(id, function(err, blog) {
    if (err) return next(err);
    if (!blog) return next(new Error('Failed to load blog ' + id));
    req.blog = blog;
    next();
  });
};

/**
 * Create a blog
 */
blogs.create = function(req, res) {
  var blog = new Blog(req.body);
  blog.creator = req.user;

  blog.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(blog);
    }
  });
};

/**
 * Update a blog
 */
blogs.update = function(req, res) {
  var blog = req.blog;
  blog.title = req.body.title;
  blog.content = req.body.content;
  blog.save(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(blog);
    }
  });
};

/**
 * Delete a blog
 */
blogs.destroy = function(req, res) {
  var blog = req.blog;

  blog.remove(function(err) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(blog);
    }
  });
};

/**
 * Show a blog
 */
blogs.show = function(req, res) {
  res.json(req.blog);
};

/**
 * List of Blogs
 */
blogs.all = function(req, res) {
  Blog.find().sort('-created').populate('creator', 'username').exec(function(err, blogs) {
    if (err) {
      res.json(500, err);
    } else {
      res.json(blogs);
    }
  });
};

module.exports = function(app) {
  app.get('/api/blogs', blogs.all);
  app.post('/api/blogs', auth.ensureAuthenticated, blogs.create);
  app.get('/api/blogs/:blogId', blogs.show);
  app.put('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.update);
  app.del('/api/blogs/:blogId', auth.ensureAuthenticated, auth.blog.hasAuthorization, blogs.destroy);
}