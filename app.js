var express = require("express");
var mongoose = require("mongoose");
var parser = require("body-parser");

var app = express();
var port = 3000;

var db = mongoose.connect("mongodb://localhost/primer");
var Restaurant = require("./models/restaurantModel");

app.use(parser.urlencoded({extended:true}));
app.use(parser.json());

// se tiver /api na url, redireciona para o router
mainRoute = require("./routes/restaurantRoutes")(Restaurant);
app.use("/api/Restaurants", mainRoute);

// pagina principal
app.get("/", function(req, res){
  res.send("Restaurant API");
});

// listening - start
app.listen(port, function(){
  console.log("running");
});
