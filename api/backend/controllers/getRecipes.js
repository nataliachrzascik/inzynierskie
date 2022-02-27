const config = require("../config/authConfig.js");
const db = require("../models");
const Recipes = db.recipes;


var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

exports.getRecipes = (req, res) => {
 
  console.log(req.url)
  let categoryUrl=req.url.substring(17)
  console.log(categoryUrl)

if(categoryUrl!="mainPage"){
db.recipes.find({'category':categoryUrl},(err,recipes)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }

    
     res.send({ recipe: recipes });
      
})
}
else if(categoryUrl=="mainPage")
db.recipes.find({$or:[{'category':"sweets"},{'category':"soups"},{'category':"dishes"},{'category':"salads"}]},(err,recipes)=>{
  if (err) {
      res.status(500).send({ message: err });
      return;
    }
   res.send({ recipe: recipes });
    
})
};

