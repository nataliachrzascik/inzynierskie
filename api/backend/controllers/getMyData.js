const db = require("../models");
const Recipes = db.recipes;


exports.getMyData = (req, res) => {
  let nickUrl=req.url.substring(16);

db.user.find({'username':nickUrl},(err,data)=>{
    if (err) {
        res.status(500).send({ message: err });
        return;
      }
     res.send({ data: data });
      
})


};
