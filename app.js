const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const { result } = require('lodash');
const blogRoutes = require('./routes/blogRoutes')
const blogController = require('./controllers/blogController')

const app = express();

const dbURI = 'mongodb+srv://keycow:susibaka@prefinalcluster.u2n1t2z.mongodb.net/?retryWrites=true&w=majority&appName=PrefinalCluster'
mongoose.connect(dbURI)
    .then((result) => app.listen(3000), console.log("please work"))
    .catch((err) => console.log("MongoDB connection failed:", err));


app.set("view engine", 'ejs');

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.get('/',(req, res) => {
   res.redirect('/blogs')
});

app.get('/about',(req, res) => {
    res.render('about', {title: 'About'});
});

app.get('/about-us',(req, res) => {
    res.redirect('/about');
});

app.get('/:id/update',(req,res) => {
    res.render('blogs/create', {title: 'Create a new Blog'});
});
//blog routes
app.use('/blogs',blogRoutes)

app.use((req, res) => {
    res.status(404).render('404');
});
