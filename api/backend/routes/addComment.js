const { authJwt } = require("../middlewares");
const controllerComment = require("../controllers/addComment.js");

module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });
console.log("dodawanie komentarza")
  app.post("/api/addComment/*", controllerComment.addComment);
};