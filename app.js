const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://test1:Qwerty512@cluster0.x3p1t.gcp.mongodb.net/blog";
const client = new MongoClient(uri, {useUnifiedTopology: true});
client.connect(err => {
    const collection = client.db("test").collection("devices");
    // perform actions on the collection object
    client.close();
});
//mongoose
mongoose.connect('mongodb+srv://test1:Qwerty512@cluster0.x3p1t.gcp.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB blog! all right!!!!'))
    .catch(error => console.log(error.message));

// app config
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static("public"));
//model
let blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
let Blog = mongoose.model("Blog", blogSchema);

// Blog.create({
// //     title:"test blog",
// //     image:"https://images.unsplash.com/photo-1529154691717-3306083d869e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80"
// // });

//ROUTES
app.get("/", function (req, res) {
    res.redirect("/blogs")
});

app.get("/blogs", function (req, res) {
    Blog.find({}, function (err, blogs) {
        if (err) {
            console.log("error!")
        } else {
            res.render("index", {blogs: blogs});
        }

    })
});

app.listen(3000, function () {
    console.log("server start")
});


