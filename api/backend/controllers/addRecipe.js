const db = require("../models");
const Recipes = db.recipes;
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.add = (req, res) => {
  const recipe = new Recipes({
    nick: req.body.nick,
    title: req.body.title,
    category: req.body.category,
    ingredients:req.body.ingredients,
    descryption:req.body.descryption,
    name:req.body.name,
    file:req.body.file,
    comments:[]
  });

  recipe.save((err, recipe) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.send({ message: "Przepis został dodany pomyślnie!" });
    
    
  });
};

