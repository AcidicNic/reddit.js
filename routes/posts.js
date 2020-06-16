const express = require('express');
const router = express.Router();

const Post = require('../models/post');

/* Get Home */
router.get('/', async (req, res, next) => {
    try {
        posts = Post.find({});
        res.render('home', {posts});
    } catch (err) {
        console.log(err);
        return next(err);
    }
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
