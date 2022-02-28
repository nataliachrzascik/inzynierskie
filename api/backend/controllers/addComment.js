const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.addComment = (req, res) => {
  let itemUrl=req.url.substring(16)
db.recipes.findByIdAndUpdate(itemUrl, {$push:{comments:{"text":req.body.comment, "nick":req.body.activeUser}}},
    function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        console.log("Dodano komentarz");
    }
})
};
