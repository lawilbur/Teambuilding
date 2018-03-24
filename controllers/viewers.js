const express = require('express');
const router = express.Router();
const Posts = require('../models/posts.js');
const session = require('express-session');

//index
router.get('/index' , (req , res)=>{
    Posts.find({}, (err, foundPosts)=>{
        res.render('item_index.ejs', {
            posts: foundPosts,
            currentUser: req.session.currentuser
        })
    })

})
//New
router.get('/new' , (req , res)=>{
    res.render('new.ejs', {
        currentUser: req.session.currentuser
    });
})

//Show
router.get('/index/:id', (req , res)=>{
    Posts.findById( req.params.id , (err , postContent)=>{
        res.render('show.ejs' , {
            post: postContent,
            currentUser: req.session.currentuser
        })
    })

})

//edit
router.get('/index/:id/edit', (req , res)=>{
    Posts.findById( req.params.id , (err , postContent)=>{
        let objects = postContent.needed.join(', ');
        postContent.needed = objects;
        res.render('edit.ejs' , {
            post: postContent,
            currentUser: req.session.currentuser
        })
    })

})

// Create
router.post ('/' , (req , res)=>{
    let tagsArr = req.body.tags.split(', ');
    req.body.tags = tagsArr;
    let neededArr = req.body.needed.split(', ');
    req.body.needed = neededArr;

    Posts.create(req.body , (err , post)=>{
        if(err) {
            res.send(err);
        } else {
            res.redirect('/view/index' );
        }
    })
})

//update
router.put('/:id' , (req , res)=>{
    let tagsArr = req.body.tags.split(', ');
    req.body.tags = tagsArr;
    let neededArr = req.body.needed.split(', ');
    req.body.needed = neededArr;
    Posts.findByIdAndUpdate(req.params.id , req.body, (err , post)=>{
        res.redirect('/view/index');
    })
})

//DELETE
router.delete('/:id', (req , res)=>{
    Posts.findByIdAndRemove(req.params.id , (err , post)=>{
        res.redirect('/view/index')
    })
})

//Seed
const seed = require('../models/seed.js');
router.get('/seed' , (req, res)=>{
    Posts.create(seed, (err, createdPosts) => {
    // logs created users
    // console.log(createdPosts);
    // redirects to index
    res.redirect('/');
  });
});

module.exports = router;
