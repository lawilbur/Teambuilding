const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');
const session = require('express-session');

router.get('/new', (req , res)=>{ //
    res.render('users/new.ejs', {
        currentUser: req.session.currentuser
    })
})


router.post('/', (req , res)=>{
    req.body.password = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    User.create(req.body, (err , createdUser)=>{
        res.redirect('/');
    })
})


module.exports = router
