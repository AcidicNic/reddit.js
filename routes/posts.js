const express = require('express');
const router = express.Router();

const Post = require('../models/post');

/* Get Home */
router.get('/', (req, res) => {
    Post.find({}).lean()
    .then(posts => {
        res.render("home", { posts });
    })
    .catch(err => {
        console.log(err.message);
    });
});

/* Submit Post */
router.get('/submit', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.redirect(`/`);
    })
});

/* Create Post */
router.post('/submit', (req, res) => {
    const post = new Post(req.body);
    post.save((err, post) => {
        return res.redirect(`/`);
    })
});

/* View Single Post */
router.get("/posts/:id", function(req, res) {
  Post.findById(req.params.id).lean()
    .then(post => {
      res.render("posts-show", { post });
    })
    .catch(err => {
      console.log(err.message);
    });
});

/* Dump */
router.get("/d/:dump", function(req, res) {
  Post.find({ dump: req.params.dump }).lean()
    .then(posts => {
      res.render("home", { posts, dump: req.params.dump });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
