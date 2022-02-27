const config = require("../config/authConfig.js");
const db = require("../models");
const Recipes = db.recipes;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getMyRecipes = (req, res) => {
  let nickUrl=req.url.substring(19)

db.recipes.find({'nick':nickUrl},(err,recipes)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }

    
     res.send({ recipe: recipes });
      
})


};