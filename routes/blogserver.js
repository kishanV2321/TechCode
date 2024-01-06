const express = require('express');
const path = require('path');
const blogs = require('../data/blogs.js');

const router = express.Router();

router.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

router.get('/blog', (req, res) => {
    res.render('blogHome', {
        blogs: blogs
    });
});

router.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/contact.html'));
});


router.get('/blogpost/:slug', (req, res) => {
    const myBlog = blogs.find((blog) => blog.slug === req.params.slug);

    if (!myBlog) {
        // Handle case when the blog with the specified slug is not found
        res.status(404).send('Blog not found');
        return;
    }

    res.render('blogpost', {
        title: myBlog.title,
        content: myBlog.content
    });
});

module.exports = router;
