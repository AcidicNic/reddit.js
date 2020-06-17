const express = require('express');
const router = express.Router();

const Post = require('../models/post');
const Comment = require('../models/comment');

router.post("/d/:dump/:postId/comments", (req, res) => {
  const comment = new Comment(req.body);
  comment
    .save()
    .then(comment => {
      return Post.findById(req.params.postId);
    })
    .then(post => {
      post.comments.unshift(comment);
      return post.save();
    })
    .then(post => {
      res.redirect(`/`);
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;