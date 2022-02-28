const db = require("../models");
const Recipes = db.recipes;


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
