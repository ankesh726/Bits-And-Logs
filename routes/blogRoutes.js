//setting up express router
const express = require('express');
// const Blog = require('../models/blogs.js');//putting it in controllers
const router = express.Router();
const blogController = require('../controllers/blogControllers.js');


//   router.get('/blogs',(req,res)=>{
//     Blog.find().sort({createdAt: -1})
//     .then((result)=>{
//       res.render('index',{title: 'All Blogs', blogs: result});
//     })
//     .then((err)=>{
//       console.log(err)
//       ;
//     });
//   });
  
//   router.get('/blogs/create', (req, res) => {
//     res.render('create', { title: 'Create a new blog' });
//   });
  
//   router.post('/blogs',(req,res)=>{
//     // console.log(req);
//     // console.log(req.body);
//     const blog = new Blog(req.body);
//     blog.save()
//     .then((result)=>{
//       res.redirect('/blogs');
//     })
//     .then((err)=>{
//       console.log(err);
//     });
//   });
  
  
//   router.get('/blogs/:id',(req,res)=>{
//     const id = req.params.id;
//     // console.log(id);
//     Blog.findById(id)
//       .then((result)=>{
//         res.render('details',{title:'Blog Details', blog: result});
//       })
//       .catch((err)=>{
//         console.log(err);
//       })
//   });
  
//   router.delete('/blogs/:id',(req,res)=>{
//     const id = req.params.id;
//     // console.log(id);
//     Blog.findByIdAndDelete(id)
//       .then((result)=>{
//         res.json({redirect: '/blogs'});
//       })
//       .catch((err)=>{
//         console.log(err);
//       });
//   });


//using controller files
  router.get('/blogs', blogController.blog_index);
  router.get('/blogs/create', blogController.blog_create_get);
  router.post('/blogs', blogController.blog_create_post);
  router.get('/blogs/:id', blogController.blog_details);
  router.delete('/blogs/:id',blogController.blog_delete);

  module.exports = router;