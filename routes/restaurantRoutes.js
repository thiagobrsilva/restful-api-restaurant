var express = require("express");

var routes = function(Restaurant){
   var restaurantRoute = express.Router();
   var restaurantController = require("..//controllers/restaurantController.js")(Restaurant)

  restaurantRoute.route("/")
      // inserindo novo registro
      .post(restaurantController.post)

      // pegando lista completa
      .get(restaurantController.get);

  // middleware - reparar que middleware tem .use e uma rota tem .route
  restaurantRoute.use("/:id", function(req, res, next){
        Restaurant.findById(req.params.id, function(err, restaurant)
        {
             if (err)
                res.status(500).send(err);
             // testando se o registro foi encontrado, se for encontrado redireciona para a próxima função que
             // atenda os requisitos usando o método next
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

  restaurantRoute.route("/:id")
      .get(function(req,res){
          res.json(req.restaurant);
      })

      .put(restaurantController.put)

      .delete(restaurantController.delete);

   return restaurantRoute;

};

module.exports = routes;
