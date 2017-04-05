var express = require("express");

var routes = function(Restaurant){
   var restaurantRoute = express.Router();
   var restaurantController = require("..//controllers/restaurantController.js")(Restaurant)

   // verbs without receive the id
   restaurantRoute.route("/")
      // post - insert new record
      .post(restaurantController.post)

      // get - get all records
      .get(restaurantController.get);

  // middleware to check if id exists
  restaurantRoute.use("/:id", function(req, res, next){
        Restaurant.findById(req.params.id, function(err, restaurant)
        {
             if (err)
                res.status(500).send(err);
             else if(restaurant)
             {
                req.restaurant = restaurant;
                next();
             }
             else{
               res.status(404).send("not found");
             }
         });
  })

  //verbs with ID
  restaurantRoute.route("/:id")
      // get - get specific record
      .get(function(req,res){
          res.json(req.restaurant);
      })
      // put - update a record
      .put(restaurantController.put)

      // delete - delete a record
      .delete(restaurantController.delete);

   return restaurantRoute;

};

module.exports = routes;
