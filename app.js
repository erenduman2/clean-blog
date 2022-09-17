const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const ejs = require('ejs');
const path = require('path');

const app = express();
const Schema = mongoose.Schema;

// connection
mongoose.connect('mongodb://localhost/clean-blog-test-db', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // useFindAndModify: false,
});

// CREATE SCHEMA
const PostSchema = new Schema({
  name: String,
  message: String,
  dateCreated: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model('Post', PostSchema);


// a etiketine ?method=POST eklenmesini sağlar
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

app.get('/', async (req, res) => {
  const posts = await Post.find({}).sort('-dateCreated');
  res.render('index', {
    posts: posts,
  });
});

app.get('/about', (req, res) => {
  console.log(req.body);
  res.render('about');
});

app.get('/add_post', (req, res) => {
  res.render('add_post');
});

app.get('/post', (req, res) => {
  res.render('post');
});

app.post('/post', async (req, res) => {
  console.log(req.body);
  await Post.create(req.body)
  res.redirect("/")
});

const port = 3000;
app.listen(port, () => {
  console.log('sunucu basladi');
});
