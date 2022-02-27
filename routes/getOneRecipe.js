const { authJwt } = require("../middlewares");
const controllerItemRecipe = require("../controllers/getOneRecipe.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/getOneRecipe/*", controllerItemRecipe.getItemRecipe);
};