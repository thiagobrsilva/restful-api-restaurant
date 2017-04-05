var restaurantController = function(Restaurant) {

   // insert restaurant
   var post = function(req,res){
      var restaurant = new Restaurant(req.body);
      restaurant.save();

      //return code status 201[created] and the new item
      res.status(201).send(restaurant);

   }
   // select restaurant
   var get = function(req,res){
        var query = req.query;
         Restaurant.find(query, function(err, restaurant){
            if (err)
               res.status(500).send(err);
            else
               res.json(restaurant);
          });
    }

    // delete restaurant
    var del = function(req,res){
       req.restaurant.remove(function(err){
         if (err)
            res.status(500).send(err);
         else {
            res.status(204).send("Deleted");
         }
       });
    }

    // update restaurant
    var put = function(req, res){
        req.restaurant.address = req.body.address;
        req.restaurant.borough = req.body.borough;
        req.restaurant.cuisine = req.body.cuisine;
        req.restaurant.grades = req.body.grades;
        req.restaurant.name = req.body.name;
        req.restaurant.restaurant_id = req.body.restaurant_id;
        req.restaurant.save(function(err){
           if (err)
              res.status(500).send(err);
           else {
              res.json(req.restaurant);
           }
        });

    }

    // return available http verbs
    return {
      post:post,
      put: put,
      delete:del,
      get: get
    }

}

module.exports = restaurantController;
