var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var mongoose= require("mongoose");
var Owner = require("./../../models/owner.js");
const nodemailer = require("nodemailer");
var enums = require("./../../util/enums.js");

const sendgridTransport = require("nodemailer-sendgrid-transport");
const auth_config = require('./../../util/nodemailer.js');
const transport = nodemailer.createTransport(sendgridTransport(auth_config));
var Prospect = require("./../../models/prospects.js");

const {validationResult} = require("express-validator");

var utility = require("./admin_utility.js");
var email_sensitive = require("./../../util/sensitive.js").email;

var AUTHPAGE = path.join(rootDir,"views","admin","login.ejs");

var server = require("./../../server.js");

const { compileFunction } = require("vm");

const Subscribe = async (req,res,next) => {

  var errors = validationResult(req);

  if(errors.isEmpty()){

    var body = req.body;
    var new_prospect = new Prospect();

    new_prospect.email = body.email;
    new_prospect.name = body.name;
    new_prospect.time_created = new Date();
    new_prospect.status = enums.Subscribed;
    prospect_found = await Prospect.findOne({email:body.email});

    if(prospect_found != null){
      res.json(false);
      return;
    }

    new_prospect.save();

    transport.sendMail({
      to:body.email,
      from:"marcokhodr16@gmail.com",
      subject:"Thank You for signing up!",
      html:`
        <div style="position:relative;box-shadow:0px 0px 10px rgba(0,0,0,.5);text-align:center;padding:30px;border-radius:10px;border:1px solid black">
          <img style="position:absolute;width:100px;margin-left:-40px;top:0%;opacity:1"
          src = "https://cdn.shopify.com/s/files/1/0300/2577/7251/files/Untitled_design_-_2024-10-25T234426.750.png?v=1729925216"
          />
          <h1 style="text-align:center;font-size:25px">Thank You ${body.name} for Signing Up </h1>

          <p style="font-size:20px;font-weight:300">
            Call 480-822-0511 or email us at this address to schedule a free quote / window cleaning!
          </p>

          <p style="font-size:16px;font-weight:300">
            Show this to your window cleaner and get 15% off!
          </p>
          <br>

          <h2> We hope to hear from you soon! </2>
          <h2> Custom Facility Services | Window Cleaning Experts </h2>

        </div>
       `

    }).then((e)=>{
      res.json(true);
    }).catch((err)=>{
      res.json(false);
    });

  }else{
    res.json(false);
  }

}

module.exports.Subscribe = Subscribe;
