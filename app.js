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

mongoose.connect('mongodb+srv://test1:Qwerty512@cluster0.x3p1t.gcp.mongodb.net/blog', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to DB blog! all right!!!!'))
    .catch(error => console.log(error.message));


app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
