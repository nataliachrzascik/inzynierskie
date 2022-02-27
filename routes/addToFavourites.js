const { authJwt } = require("../middlewares");
const controllerAddToFavourites = require("../controllers/addToFavourites.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
console.log("dodawanie do ulubionych");
  app.post("/api/addToFavourite/", controllerAddToFavourites.addToFavourites);
};