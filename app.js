//  https://www.youtube.com/watch?v=yXEesONd_54&list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU&index=7

const express = require('express');
const morgan = require('morgan');//a package of middleware for loggin
const mongoose = require('mongoose');
// const Blog = require('./models/blogs.js'); //we gonna need this in blogRoutes.js
const router = require('./routes/blogRoutes.js');//setting up express router

// express app
const app = express();
const PORT = process.env.PORT || 3000;


//connect to mongodb
const dbURI = 'mongodb+srv://curiouslad:apple123@cluster0.4olsv.mongodb.net/node-tuts-blog?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(dbURI)
.then((result)=>{
  console.log('connected to db');
  app.listen(PORT); //listening for server request only after it gets connected to database
})
.catch((err)=>{console.log(err)});


// register view engine
app.set('view engine', 'ejs');
// app.set('views', 'myviews');

//a middleware used for logging when server was requested
// app.use((req,res,next)=>{
//   console.log('new request made');
//   console.log('host: ',req.hostname);
//   console.log('path: ',req.path);
//   console.log('method: ',req.method);
//   next();//this will ensure app.use wont stop next statement of code to run
// });

//using morgan for logging details
app.use(morgan('dev'));

//mongoose and mongo sandbox routes 
//just trial and learning
// app.get('/add-blog', (req,res)=>{
//   const blog = new Blog({
//     title: 'new blog 2',
//     snippet: 'about my new blog',
//     body:'more about my new blog'
//   });

//   //to save the blog instance on database
//   blog.save()//its an async task and returns a promise
//     .then((result)=>{
//       res.send(result);
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
// })

// //to get all the blogs
// app.get('/all-blogs', (req, res) => {
//   Blog.find()
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

// //for a single blog
// app.get('/single-blog', (req,res)=>{
//     Blog.findById('6710bd2b63c636628be7613e')
//     .then((result) => {
//       res.send(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// });

//static files
//express.static is a built-in middleware function in Express to serve static files like HTML, CSS, JavaScript, images
app.use(express.static('public'));

//for the POST req
// / helps your app read form data sent by users. It makes sure the data is parsed and turned into something your app can understand and work with easily
app.use(express.urlencoded({ extended: true }));


app.get('/', (req, res) => {
  // const blogs = [
  //   {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  //   {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  // ];
  // res.render('index', { title: 'Home', blogs });//everything after comma is passed to that particular EJS file and we can access it there
  res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });


//blog routes // we will use express router for all of below
// app.get('/blogs',(rq,res)=>{
//   Blog.find().sort({createdAt: -1})
//   .then((result)=>{
//     res.render('index',{title: 'All Blogs', blogs: result});
//   })
//   .then((err)=>{
//     console.log(err);
//   });
// });

// app.get('/blogs/create', (req, res) => {
//   res.render('create', { title: 'Create a new blog' });
// });

// app.post('/blogs',(req,res)=>{
//   // console.log(req);
//   // console.log(req.body);
//   const blog = new Blog(req.body);
//   blog.save()
//   .then((result)=>{
//     res.redirect('/blogs');
//   })
//   .then((err)=>{
//     console.log(err);
//   });
// });


// app.get('/blogs/:id',(req,res)=>{
//   const id = req.params.id;
//   // console.log(id);
//   Blog.findById(id)
//     .then((result)=>{
//       res.render('details',{title:'Blog Details', blog: result});
//     })
//     .catch((err)=>{
//       console.log(err);
//     })
// });

// app.delete('/blogs/:id',(req,res)=>{
//   const id = req.params.id;
//   // console.log(id);
//   Blog.findByIdAndDelete(id)
//     .then((result)=>{
//       res.json({redirect: '/blogs'});
//     })
//     .catch((err)=>{
//       console.log(err);
//     });
// });

//blog routes using express router
app.use(router);
  
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

