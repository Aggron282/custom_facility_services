var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var Owner = require("./../../models/owner.js");
var ObjectId = require("mongoose").Types.ObjectId;
var enums = require("./../../util/enums.js");

const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const auth_config = require('./../../util/nodemailer.js');
const transport = nodemailer.createTransport(sendgridTransport(auth_config));

const {validationResult} = require("express-validator");

var utility = require("./admin_utility.js");
var email_sensitive = require("./../../util/sensitive.js").email;

var AUTHPAGE = path.join(rootDir,"views","admin","login.ejs");

var server = require("./../../server.js");

const { compileFunction } = require("vm");


const Login = (req,res) => {

  var {key,username} = req.body;

  Owner.findOne({username:username,secret_key:key}).then((found_owner)=>{

    if(!found_owner){
      res.render(AUTHPAGE);
      req.session.isAuth = false;

      return;
    }

    req.session.isAuth = true;
    found_owner._id = new ObjectId(found_owner._id);
    req.session.owner = JSON.stringify(found_owner);
    req.session.save((err)=>{
      res.redirect("/admin");
    });

  });

}


const ForgotKey = async (req,res) =>{
  await SetNewKey(false);
  res.redirect("/auth/login")
}

const SetNewKey = async (manual) => {

  var new_key = Math.ceil(Math.random() * 999999999);

  const exec = await Owner.updateOne({email:email_sensitive},{$set:{secret_key:new_key}});

  if(!server.CheckIfCanEmail(manual)){
    console.log("Could not email");
    return;
  }
  if(!exec){
    console.log("Could not email");
    return;
  }

  SendEmailToOwner();

}

function SendEmailToOwner(new_key){

  transport.sendMail({
    to:email_sensitive,
    from:email_sensitive,
    subject:"Your Secret Key has been Changed",
    html:`
      <div style="position:relative;box-shadow:0px 0px 10px rgba(0,0,0,.5);text-align:center;padding:30px;border-radius:10px;border:1px solid black">

      <img style="position:absolute;width:100px;margin-left:-40px;top:0%;opacity:1"
        src = "https://cdn.shopify.com/s/files/1/0300/2577/7251/files/Untitled_design_-_2024-10-25T234426.750.png?v=1729925216"
        />

        <p style="text-align:center;font-size:20px">Your New Key</p>

        <p style="text-decoration:underline;font-size:22px;text-align:center">
         ${new_key}
        </p>

        <h2> Custom Facility Services | Window Cleaning Experts </h2>

      </div>
     `
  });
}

const GetLoginPage = (req,res) =>{
  res.render(AUTHPAGE);
}

module.exports.GetLoginPage = GetLoginPage;
module.exports.Login = Login;
module.exports.ForgotKey = ForgotKey;
