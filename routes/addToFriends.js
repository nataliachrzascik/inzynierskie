const { authJwt } = require("../middlewares");
const controllerAddToFriends = require("../controllers/addToFriends.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
console.log("dodawanie do znajomych");
  app.post("/api/addToFriends/", controllerAddToFriends.addToFriends);
};