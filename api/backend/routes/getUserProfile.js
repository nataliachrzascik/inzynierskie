const { authJwt } = require("../middlewares");
const controllerData = require("../controllers/getUserProfile.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/users/*", controllerData.getUserProfile);


};