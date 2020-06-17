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
router.get("/d/:dump/:id", (req, res) => {
    Post.findById(req.params.id).populate('comments').lean()
    .then(post => {
        if (post.dump === req.params.dump) {
            res.render("posts-show", { post, dump: req.params.dump });
        }
        // return res.redirect(`/d/${req.params.dump}/${req.params.id}`);
    })
    .catch(err => {
        res.render("err", { err: "Oops, looks like that post doesn't exist!" });
    });
});

/* Dump */
router.get("/d/:dump", (req, res) => {
  Post.find({ dump: req.params.dump }).lean()
    .then(posts => {
      res.render("home", { posts, dump: req.params.dump });
    })
    .catch(err => {
      console.log(err);
    });
});

module.exports = router;
