//depend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user.js');
const Posts = require('./models/posts.js');
const session = require('express-session');


//middleware
app.use(session({
  secret: "randomstring",
  resave: false,
  saveUninitialized: false
}));
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:false}));
app.use(express.static('public'))

//Controllers
const viewerController = require('./controllers/viewers.js');
app.use('/view', viewerController);

const usersController = require('./controllers/users.js');
app.use('/users', usersController);

const sessionsController = require('./controllers/sessions.js');
app.use('/sessions', sessionsController);


//route
app.get('/' , (req , res)=>{
    res.render('index.ejs', {
        currentUser: req.session.currentuser
    })
})


const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teambuilding';
mongoose.connect(mongoURI);
mongoose.connection.once('open' , ()=>{
    console.log('connected to mongo');
});

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('listening' + port);
});
