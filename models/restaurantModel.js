var mongoose = require("mongoose"),
    Schema = mongoose.Schema;

var restaurantModel = new Schema({
  address: {
    building: Number,
    coord:[],
    street: String,
    zipcode: Number,
  },
  borough: String,
  cuisine: String,
  grades:[],
  name: String,
  restaurant_id: Number
});

module.exports = mongoose.model("Restaurant", restaurantModel);
