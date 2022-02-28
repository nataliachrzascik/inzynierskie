const mongoose = require('mongoose');
const db = require("../models");
const Recipes = db.recipes;

exports.getFavouriteRecipes = (req, res) => {
 let objectIDRecipes=[];
 req.body.tableID.map((element, k) => {
    objectIDRecipes.push(mongoose.Types.ObjectId(element.recipeID));
});
db.recipes.find({'_id': { $in: objectIDRecipes}},(err,recipes)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }
     res.send({ recipe: recipes });
      
})



};
