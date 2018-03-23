//depend
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const User = require('./models/user.js');
const Posts = require('./models/posts.js');

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
    Posts.find({}, (err, foundPosts)=>{
        res.render('item_index.ejs', {
            posts: foundPosts
        })
    })

})
app.get('/index/:id', (req , res)=>{
    Posts.findById( req.params.id , (err , postContent)=>{
        res.render('show.ejs' , {
            post: postContent
        })
    })

})
app.get('/index/:id/edit', (req , res)=>{
    Posts.findById( req.params.id , (err , postContent)=>{
        res.render('edit.ejs' , {
            post: postContent
        })
    })

})
app.put('/:id' , (req , res)=>{
    Posts.findByIdAndUpdate(req.params.id , req.body, (err , product)=>{
        res.redirect('/index');
    })
})
app.post('/users', (req , res)=>{
    User.create(req.body, (err , createdUser)=>{
        if(err){
            res.send('something went wrong')
        }
        res.redirect('/');
    })
})

const seed = require('./models/seed.js');
app.get('/seed' , (req, res)=>{
    Posts.create(seed, (err, createdPosts) => {
    // logs created users
    console.log(createdPosts);
    // redirects to index
    res.redirect('/');
  });
});

const mongoURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/teambuilding';
mongoose.connect(mongoURI);
mongoose.connection.once('open' , ()=>{
    console.log('connected to mongo');
});

const port = process.env.PORT || 3000;
app.listen(port , ()=>{
    console.log('listening' + port);
});
