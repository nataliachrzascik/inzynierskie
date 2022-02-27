const { authJwt } = require("../middlewares");
const controllerRecipe = require("../controllers/addRecipe.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
console.log("server routes addRecipes")
  app.post("/api/recipes/add", controllerRecipe.add);
};