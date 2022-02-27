const { authJwt } = require("../middlewares");
const controllerRecipe = require("../controllers/getMyRecipes.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/myRecipes/get/*", controllerRecipe.getMyRecipes);


};