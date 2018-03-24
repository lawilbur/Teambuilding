const express = require('express');
const router = express.Router();
const User = require('../models/user.js');
const bcrypt = require('bcrypt');

router.get('/new', (req , res)=>{ //
    res.render('sessions/new.ejs')
})


router.post('/' , (req , res)=>{
    User.findOne({name: req.body.name} , (err , foundUser)=>{
        if(bcrypt.compareSync(req.body.password, foundUser.password)){
            req.session.currentuser = foundUser;
            res.redirect('/');
        } else {
            res.send('wrong password');
        }
    });
});


router.delete('/', (req , res)=>{
    req.session.destroy(()=>{
        res.redirect('/');
    })
}) //this is for loggin out


module.exports = router
