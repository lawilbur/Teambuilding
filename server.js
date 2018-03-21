//depend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user.js')

//middleware
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

//Controllers
// const usersController = require('./controllers/users.js');

app.get('/' , (req , res)=>{
    res.render('index.ejs')
})
app.get('/new', (req , res)=>{
    res.render('new.ejs')
})
app.get('/index' , (req , res)=>{
    res.render('index.ejs')
})
app.post('/users', (req , res)=>{
    User.create(req.body, (err , createdUser)=>{
        if(err){
            res.send('something went wrong')
        }
        res.redirect('/');
    })
})



mongoose.connect('mongodb://localhost:27017/teambuilding');
mongoose.connection.once('open' , ()=>{
    console.log('connected to mongo');
});

app.listen(3000 , ()=>{
    console.log('listening');
})
