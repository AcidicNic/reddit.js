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

/* Get Single Post */
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

module.exports = router;
