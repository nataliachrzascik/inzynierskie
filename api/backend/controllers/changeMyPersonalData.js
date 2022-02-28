const db = require("../models");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

exports.changeMyPersonalData = (req, res) => {
  let itemUrl=req.url.substring(26)
  if(req.body.name!=""){
    db.user.findByIdAndUpdate(itemUrl, {$set:{name:req.body.name}}, {new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Zaktualizowano dane osobowe");
        }
    })
  }
  if(req.body.sex!=""){
    db.user.findByIdAndUpdate(itemUrl, {$set:{sex:req.body.sex}}, {new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Zaktualizowano dane osobowe");
        }
    })
  }
  if(req.body.city!=""){
    db.user.findByIdAndUpdate(itemUrl, {$set:{city:req.body.city}}, {new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Zaktualizowano dane osobowe");
        }
    })
  }
  if(req.body.file!=""){
    db.user.findByIdAndUpdate(itemUrl, {$set:{file:req.body.file}}, {new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Zaktualizowano dane osobowe");
        }
    })
  }
  if(req.body.descryption!=""){
    db.user.findByIdAndUpdate(itemUrl, {$set:{descryption:req.body.descryption}}, {new: true},
        function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Zaktualizowano dane osobowe");
        }
    })
  }
  res.send({ message: "Zaktualizowano dane osobowe!" });
}
