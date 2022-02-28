const db = require("../models");
const Recipes = db.recipes;


exports.getUserProfile = (req, res) => {
  let nickUrl=req.url.substring(11);

db.user.find({'username':nickUrl},(err,data)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }
     res.send({ data: data });
      
})


};
