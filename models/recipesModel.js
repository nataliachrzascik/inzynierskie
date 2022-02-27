const mongoose = require("mongoose");

const Recipe = mongoose.model(
  "Recipe",
  new mongoose.Schema({
    nick: String,
    title: String,
    category: String,
    ingredients: String,
    descryption:String,
    name:String,
    file:String,
    comments:[]
  })
);

module.exports = Recipe;

