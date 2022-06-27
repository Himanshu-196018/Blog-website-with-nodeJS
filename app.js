const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const { render } = require("express/lib/response");
const mongoose = require("mongoose");
const { result } = require("lodash");

// constant which will display on the website.
const homeStartingContent = `Welcome! viewers, I am Himanshu and you are surfing on Himanshu's Blog Website. You can
read my Blogs here. I try to post a daily blog which is fun to read and contains a lot more knowledge. The blogs i 
Write are "How to" blogs in which i explain step to complete a particular task and also "Review" blogs in which i give
my review on various products, applications and sometimes on games also.`;

const aboutContent = `Hello viewers, I am Himanshu. I am an engineering student pursuing the carrer of MERN full stack
developer. I am a hard worker and goal seeking person. If I set a goal, I do my Best to achieve it. I love to play 
PC and mobile games. My favourite game if Mobile Legends: Bang Bang. I love Sports too, my favourite sport is Table Tennis`;

const contactContent = [
    "You can contact me from the following info",
    "Mobile No.: xxxxxxxxxx",
    "Email Address:",
    "1. himanshulohchab111@gmail.com",
    "2. himanshu_196018@saitm.org",
];

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");

// connect mongoose database
mongoose.connect("mongodb://localhost:27017/Blogs", { useNewUrlParser: true });

//create mongoose schema
const postSchema = new mongoose.Schema({
    Title: String,
    postBody: String,
});

//mongoose model
const Post = new mongoose.model("post", postSchema);

const post1 = new Post({
    Title: "My First Blog",
    postBody:
        "I have the most amazing spring rolls + peanut dipping sauce to share with you today. Perfect dish for summer entertaining!I love this recipe because it requires no real cooking at all (just assembly), looks amazing, and can be adapted to whatever ingredients you have. It’s also so healthy-if you want it to be! I made a summer veggie version with mango, avocado, bell peppers, sprouts, cilantro, lime, peanuts, and green onions. The mango is key here, it adds such great sweetness and compliments the other veggies so well. I’ve been such a fan of mango these days putting it in everything from my favorite kale salad to mango salsa for fish tacos.",
});

//Routes

//Home route
app.get("/", function (req, res) {
    Post.find({}, (err, result) => {
        if (result.length === 0) {
            post1.save((err) => {
                if (err) {
                    console.log(err);
                }
            });
            res.redirect("/");
        } else {
            res.render("home", {
                homeText: homeStartingContent,
                posts: result,
            });
        }
    });
});

app.get("/about", function (req, res) {
    res.render("about", { aboutText: aboutContent });
});

app.get("/contact", function (req, res) {
    res.render("contact", { contactText: contactContent });
});

app.get("/compose", function (req, res) {
    res.render("compose");
});
app.post("/compose", function (req, res) {
    const post = {
        title: req.body.titleBody,
        content: req.body.postBody,
    };
    post.save();
    res.redirect("/");
});

app.get("/posts/:title", function (req, res) {
    Post.find({}, (err, result) => {
        result.forEach((ele) => {
            if (_.lowerCase(ele.Title) === _.lowerCase(req.params.title)) {
                res.render("post", { postTitle: ele.Title, postBody: ele.postBody });
            }
        });
    });
});

app.listen("3000", function () {
    console.log("App is running on server 3000");
});