var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var mongoose= require("mongoose");
var ObjectId = mongoose.Types.ObjectId;

var Schedule = require("./../../data/schedule.js");
var Meta = require("./../../data/meta.js");
var Labor = require("./../../data/labor.js");
var Prospect = require("./../../models/prospects.js");
var Owner = require("./../../models/owner.js");
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

var data = null;

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

const AddProspect = async(req,res,next) =>{
  
  var {name,phone_number,email,quote,address,schedule_date} = req.body;
  var errors = validationResult(req);

  if(errors.isEmpty()){
    var new_prospect = new Prospect();
    new_prospect.name = name;
    new_prospect.phone_number = phone_number;
    new_prospect.quote = quote;
    new_prospect.email = email;
    new_prospect.schedule_date = schedule_date;
    new_prospect.time_created = new Date();
    new_prospect.status = 0;
    await new_prospect.save();
    res.json(true);
  }
  else{
    res.json(false);
  }

}

const CompleteProspectJob = async (req,res,next) => {
  
  var errors = validationResult(req);
  
  if(errors.isEmpty() == false){
    res.json(false);
    return;
  }
  var {hours,quote,miles,material_cost,_id,date_completed} = req.body;
 
  var found_owner = await Owner.findById(req.session.owner._id);
 
  if(found_owner){
    
    var new_owner = {...found_owner._doc};
    const MILEAGE = (3.79 / 23); 
    const PERJOB = 20;

    var completed_job = {
      quote:parseInt(quote),
      hours:parseInt(hours),
      date_completed:date_completed,
      miles:parseInt(miles),
      material_cost:parseInt(material_cost),
      profit: 0,
      prospect_id:_id,
      qty:1,
      hourly_profit:0
    }

    completed_job.profit = parseInt(quote - ((miles * MILEAGE) + (material_cost / PERJOB)));
    completed_job.hourly_profit = parseInt(completed_job.profit / completed_job.hours);
   
    var completed_jobs = new_owner.completed_jobs.length > 0 ? [...new_owner.completed_jobs,completed_job] : [completed_job];
    
    var update = { $set: {completed_jobs: completed_jobs} }
    const prospect = await Prospect.findOne({_id:_id});
    console.log(prospect);
    if(prospect._doc.status == 3){
      return;
    }
    
    var update_prospect = {$set:{status:3}};
  
    const exec_prospect = await Prospect.findOneAndUpdate({_id:_id},update_prospect);
    const exec = await Owner.findOneAndUpdate({_id:new ObjectId(req.owner._id)},update); 
    console.log(exec,exec_prospect);
    res.json(true);

  }
  else{
    res.json(false);
  }

}

const ChangeProspectStatus = async (req,res,next)=>{
  
  var body = req.body;
  var found_prospect = await Prospect.findOne({_id:new ObjectId(body._id)});
  
  if(found_prospect){

    var new_prospect = {...found_prospect._doc};
    var update = { $set: {status: parseInt(body.status) } }
    
    const exec = await Prospect.findOneAndUpdate({_id:new ObjectId(body._id)},update);
   
    res.json(true);

  }else{
    res.json(false);
  }

}

const AddProspectDetails = async (req,res,next)=>{
  var body = req.body;
  var found_prospect = await Prospect.findOne({_id:new ObjectId(body._id)});
 
  if(found_prospect){

    var new_prospect = {...found_prospect._doc};

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
    if(new_prospect.schedule || new_prospect.address && new_prospect.quote){
      
      if(new_prospect.status == enums.Subscribed){
        new_prospect.status = enums.Quoted;
      }

    }
    var update = { $set: { quote: new_prospect.quote, schedule:new_prospect.schedule, address:new_prospect.address, status: new_prospect.status } }

    const exec = await Prospect.findOneAndUpdate({_id:new ObjectId(body._id)},update);
   
    res.json(true);
  
  }
  else{
    res.json(false);
  }

}

const EditSchedule = async (req,res,next) => {

  var data  = req.body;

  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const DeleteSchedule = async (req,res,next) => {

  var data  = req.body;
  
  data.name_of_job = "";
  data.address = "";
  
  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const GetIndexPage = async (req,res,next) => {

   if(!data){
     data = await utility.renderAllData(req,res);
   }

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
      res.redirect("/");
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
    });

    res.redirect("/")

  }

}

const DeleteProspect = async (req,res,next)=>{
 
  var body = req.body;

  const delete_ = await Prospect.deleteOne({_id:new ObjectId(body._id)});

  res.json(delete_);

}

const ToggleProspects = async (req,res,next) =>{
  
  var toggle = parseInt(req.body.toggle);
  data.toggle = toggle;
  res.redirect("/admin");

}

module.exports.DeleteProspect = DeleteProspect;
module.exports.AddProspectDetails = AddProspectDetails;
module.exports.AddProspect= AddProspect;
module.exports.DeleteQuotes = DeleteQuotes;
module.exports.GetIndexPage = GetIndexPage;
module.exports.RootCount = RootCount;
module.exports.EditSchedule = EditSchedule;
module.exports.DeleteSchedule = DeleteSchedule;
module.exports.AddLaborer = AddLaborer;
module.exports.ShowSchedule = ShowSchedule;
module.exports.CompleteQuotes = CompleteQuotes;
module.exports.GetQuotePage = GetQuotePage;
module.exports.AddBrowserView = AddBrowserView;
module.exports.MakeFavorite = MakeFavorite;
module.exports.Subscribe = Subscribe;
module.exports.GetLoginPage = GetLoginPage;
module.exports.Login = Login;
module.exports.SetNewKey = SetNewKey;
module.exports.ForgotKey = ForgotKey;
module.exports.ToggleProspects = ToggleProspects;
module.exports.ChangeProspectStatus = ChangeProspectStatus;
module.exports.CompleteProspectJob = CompleteProspectJob;
