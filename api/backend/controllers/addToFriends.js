const db = require("../models");
const jwt = require("jsonwebtoken");

exports.addToFriends = (req, res) => {
const myID=req.body.myID;
const friendID=req.body.friendID;
    
db.user.findByIdAndUpdate(myID, {$push:{friends:{friendID}}},
    function (err, docs) {
    if (err){
        console.log(err)
    }
    else{
        res.send({ message: "Dodano do znajomych!" });
    }
})


};
