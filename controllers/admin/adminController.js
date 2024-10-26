var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var mongoose= require("mongoose");
var ObjectId = mongoose.Types.ObjectId;
var Schedule = require("./../../data/schedule.js");
var Meta = require("./../../data/meta.js");
var Labor = require("./../../data/labor.js");
var Prospect = require("./../../models/prospects.js");
var enums = require("./../../util/enums.js");
const nodemailer = require("nodemailer");
const sendgridTransport = require("nodemailer-sendgrid-transport");
const auth_config = require('./../../util/nodemailer.js');
const transport = nodemailer.createTransport(sendgridTransport(auth_config));
const {validationResult} = require("express-validator");

var utility = require("./admin_utility.js");

var brow = {
  firefox:0,
  safari:0,
  chrome:0,
  edge:0
}

var data_rendered_to_page = {

  prospects:null,
  total_potential_sales:0,
  modal:null,
  limited_prospects:null,
  path:null,
  pageTitle:null,
  people:null,
  meta:{
    views: null,
    brow:null,
    pages:null
  }

}

const AddProspectDetails = async (req,res,next)=>{
  var body = req.body;
  console.log(body);
  var found_prospect = await Prospect.findOne({_id:new ObjectId(body._id)});

  if(found_prospect){

    var new_prospect = {...found_prospect};

    if(!new_prospect.quote){
      new_prospect.quote = body.quote > 0 ? body.quote : new_prospect.quote;
    }
    else{
      new_prospect.address = body.address.length > 0 ? body.address : new_prospect.address;
    }
    if(!new_prospect.address){
      new_prospect.address = body.address;
    }
    else{
      new_prospect.address = body.address.length > 0 ? body.address : new_prospect.address;
    }
    if(!new_prospect.schedule){
      new_prospect.schedule = body.schedule_date;
    }
    else{
      new_prospect.schedule = body.schedule_date.length > 0 ? body.schedule_date : new_prospect.schedule;
    }
    var update = { $set: { quote: new_prospect.quote, schedule:new_prospect.schedule, address:new_prospect.address } }

    const exec = await Prospect.findOneAndUpdate({_id:new ObjectId(body._id)},update);
    console.log(exec);
    res.json(true);
  }
  else{
    res.json(false);
  }

}

const EditSchedule = async (req,res,next) => {

  var data  = req.body;
  console.log(data);
  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const DeleteSchedule = async (req,res,next) => {

  var data  = req.body;
  data.name_of_job = "";
  data.address = "";
  console.log(data)

  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const GetIndexPage = async (req,res,next) => {

   var data = await utility.renderAllData(req,res);

   res.render(path.join(rootDir,"views","/admin/index.ejs"),data);

}

const GetQuotePage = async (req,res,next) => {

  var data = await utility.renderAllData(req,res);

    Schedule.findAll((schedules)=>{

      var new_schedules = utility.MakeFavoritesBeginningArray(schedules);
      var new_data_to_page = {...data};

      data_rendered_to_page.quotes = new_schedules;
      data_rendered_to_page.path = req.path;
      data_rendered_to_page.pageTitle = "Admin Quotes";

      res.render(path.join(rootDir,"views","/admin/quote.ejs"),new_data_to_page);

  })

}

const ShowSchedule = async (req,res,next) => {

      var laborers = await Labor.ReturnAllLaborers();

      var new_data_to_page = {...data_rendered_to_page};
      new_data_to_page.pageTitle = "Admin Schedules";
      new_data_to_page.path = req.path;
      new_data_to_page.people = laborers;

      res.render(path.join(rootDir,"views","/admin/schedule_detail.ejs"),new_data_to_page);

}

const MakeFavorite = async(req,res,next) => {

    var _id = req.body._id;
    var isFav = req.body.isFav;

    var fav = await Schedule.MakeFavorite(_id,isFav,(success)=>{
      var data = utility.renderAllData(req,res);
      res.redirect("/admin/home");
    });

}

const CompleteQuotes = async(req,res,next)=>{

    Schedule.completeThese(req.body.quotes,(data)=>{
      res.redirect("/admin/home");
    });

}

const AddLaborer = async(req,res,next)=>{

  var person = req.body.first + " " + req.body.last;

  var new_laborer = new Labor(person);

  new_laborer.AddLaborer((data)=>{
    res.redirect('/admin/home');
  });

}

const AddBrowserView = (req,res,next) =>{

    const ipAddress = req.ip;

    if(req.body.root !== "Schedule Page"){
      Meta.AddPageView(ipAddress);
      Meta.AddRootView(req.body.root);
      Meta.AddBrowserView(req.body.browser);
    }

}

const RootCount = (req,res,next) =>{

    const pageName = Object.keys(req.body)[0];
    Meta.AddRootView(pageName);

}

const DeleteQuotes = (req,res,next) => {

  Schedule.deleteThese(req.body.quotes,(data)=>{
      res.redirect("/admin/home");
    });

}

const CompletedQuotes = (req,res,next) => {

   Schedule.completeThese(req.body.quotes,(data)=>{
       res.redirect('/admin/quotes');
   });

}

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
    console.log(prospect_found)
    if(prospect_found != null){
      res.redirect("/");
      return;
    }

    new_prospect.save();
    console.log(new_prospect)
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
    });

    res.redirect("/")
  }

}

exports.AddProspectDetails = AddProspectDetails;
exports.DeleteQuotes = DeleteQuotes;
exports.GetIndexPage = GetIndexPage;
exports.RootCount = RootCount;
exports.EditSchedule = EditSchedule;
exports.DeleteSchedule = DeleteSchedule;
exports.AddLaborer = AddLaborer;
exports.ShowSchedule = ShowSchedule;
exports.CompleteQuotes = CompleteQuotes;
exports.GetQuotePage = GetQuotePage;
exports.AddBrowserView = AddBrowserView;
exports.MakeFavorite = MakeFavorite;
exports.Subscribe = Subscribe;
