const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const postController = require('./controllers/postController');
const pageController = require('./controllers/pageController');

const app = express();

// connection
// zIL2Hc5ozU9a9JHv
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ?method=POST eklenmesini sağlar
app.use(
  methodOverride('_method', {
    methods: ['POST', 'GET'],
  })
);

app.set('view engine', 'ejs');

// MIDDLEWARE
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', pageController.getIndexPage);
app.get('/about', pageController.getAboutPage);
app.get('/add_post', pageController.getAddPage);
app.get('/post', pageController.getPostPage);
app.get('/posts/edit/:id', pageController.getEditPage);

app.get('/posts/:id', postController.getPost);
app.put('/post/:id', postController.updatePost);
app.post('/post', postController.createPost);
app.delete('/post/:id', postController.deletePost);

const port = 3000;
app.listen(port, () => {
  console.log('sunucu basladi');
});
