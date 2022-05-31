const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("")

const homeStartingContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type 
specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const aboutContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type 
specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.`;

const contactContent = `Lorem Ipsum is simply dummy text of the printing and typesetting industry.Lorem Ipsumhas been the 
industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type andscrambled it to make a type specimen book.`;

const app = express();

app.use(bodyParser.urlencoded({ extended : true }));
app.use(express.static("public"));

app.set('view engine', 'ejs');



app.listen("3000", function() {
    console.log("App is running on server 3000");
});