const config = require("../config/authConfig.js");
const db = require("../models");
const Recipes = db.recipes;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");



exports.getItemRecipe = (req, res) => {
  let categoryUrl=req.url.substring(18)
  

db.recipes.find({'_id':categoryUrl},(err,recipes)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }
     res.send({ recipe: recipes });
      
})
};