const config = require("../config/authConfig.js");
const db = require("../models");


var jwt = require("jsonwebtoken");




exports.addToFavourites = (req, res) => {
const recipe=req.body.path;
const userID=req.body.userID;



db.user.find({$and:[{'_id':userID},{favourite:[{recipeID:recipe}]}]},(err,recipies)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }

    if(recipies.length==0){

        db.user.findByIdAndUpdate(userID, {$push:{favourite:[{recipeID:recipe}]}},
            function (err, docs) {
            if (err){
                console.log(err);
            }
            else{
                res.send({ message: "Dodano do ulubionych!" });
            }
        })


    }
    else{
        res.send({ message: "Masz już ten przepis w ulubionych!" });
        return;
    }
      
})

};