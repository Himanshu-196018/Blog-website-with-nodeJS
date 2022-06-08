const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { render } = require("express/lib/response");

const homeStartingContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type 
specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const aboutContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type 
specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const contactContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book.`;

let posts = [];

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.render("home", 
    {
        homeText : homeStartingContent,
        posts: posts
    });
    
})

app.get('/about', function(req, res) {
    res.render("about", {aboutText : aboutContent});
})

app.get('/contact', function(req, res) {
    res.render("contact", {contactText : contactContent});
})

app.get('/compose', function(req, res) {
    res.render("compose");
})
app.post('/compose', function(req, res) {
    const post = {
        title : req.body.titleBody,
        content : req.body.postBody
    };
    posts.push(post);
    res.redirect('/')
})

app.get('/posts/:day', function(req, res) {
    posts.forEach((ele) => {
        if(_.lowerCase(ele.title) === _.lowerCase(req.params.day)){
            res.render("post", {postTitle : ele.title, postBody : ele.content})
        }
    });
})

app.listen("3000", function() {
    console.log("App is running on server 3000");
});