const { authJwt } = require("../middlewares");
const controllerchangeMyPersonalData = require("../controllers/changeMyPersonalData.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
  app.post("/api/changeMyPersonalData/*", controllerchangeMyPersonalData.changeMyPersonalData);
};