// imports
var express = require("express");
var mongoose = require("mongoose");
var parser = require("body-parser");

var app = express();

// Default port 3000
var port = 3000;

// Connecting to database
var db = mongoose.connect("mongodb://localhost/primer");

// Model based on [https://raw.githubusercontent.com/mongodb/docs-assets/primer-dataset/primer-dataset.json] MongoDB sample db
var Restaurant = require("./models/restaurantModel");

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// Route /api/Restaurants
mainRoute = require("./routes/restaurantRoutes")(Restaurant);
app.use("/api/Restaurants", mainRoute);

app.get("/", function(req, res){
  res.send("Restaurant API");
});

// Listening
app.listen(port, function(){
  console.log("running");
});
