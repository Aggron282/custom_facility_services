var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");

var Schedule = require("./../../data/schedule.js");
var Meta = require("./../../data/meta.js");
var Labor = require("./../../data/labor.js");
var utility = require("./admin_utility.js");

var brow = {
  firefox:0,
  safari:0,
  chrome:0,
  edge:0
}

var data_rendered_to_page = {

  quotes:null,
  total_potential_sales:0,
  modal:null,
  limited_quotes:null,
  path:null,
  pageTitle:null,
  people:null,
  meta:{
    views: null,
    brow:null,
    pages:null
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
