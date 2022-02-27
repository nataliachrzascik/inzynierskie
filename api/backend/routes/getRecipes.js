const { authJwt } = require("../middlewares");
const controllerRecipe = require("../controllers/getRecipes.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/recipes/get/sweets", controllerRecipe.getRecipes);
  app.post("/api/recipes/get/soups", controllerRecipe.getRecipes);
  app.post("/api/recipes/get/dishes", controllerRecipe.getRecipes);
  app.post("/api/recipes/get/salads", controllerRecipe.getRecipes);

  app.post("/api/recipes/get/mainPage", controllerRecipe.getRecipes);

};