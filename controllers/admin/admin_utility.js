var Schedule = require("./../../data/schedule.js");
var Meta = require("./../../data/meta.js");
var Labor = require("./../../data/labor.js");

var brow = {
  firefox:0,
  safari:0,
  chrome:0,
  edge:0
}

var data_rendered_to_page = {

  quotes:null,
  modal:null,
  pageTitle:null,
  people:null,
  meta:{
    views: null,
    brow:null,
    pages:null
  }

}

const  GetBrowserCounts = async ()=>{

      var browsers =   await Meta.ReturnAllBrowsers();

      var new_brow = {...brow};

      for(var i = 0; i < browsers.length;i++){

        if(browsers[i].browser == "Edge"){
          new_brow.edge = browsers[i].qty
        }
        else if(browsers[i].browser == "Chrome"){
          new_brow.chrome = browsers[i].qty
        }
        else if(browsers[i].browser == "Safari"){
          new_brow.safari = browsers[i].qty
        }
        else if(browsers[i].browser == "Firefox"){
          new_brow.firefox = browsers[i].qty
        }

      }

      return new_brow;
}


function MakeFavoritesBeginningArray(schedules){

    var new_schedules = [];

    for(var i =0; i< schedules.length;i++ ){

      if(schedules[i].isFavorite){
        new_schedules.unshift(schedules[i]);
      }
      else{
        new_schedules.push(schedules[i]);
      }

    }

  return new_schedules;

}

const renderAllData = async(req,res)=>{

      var limited_schedules = [];
      var full_schedules = [];
      var total_potential_sales = 0;
      var roots = await Meta.FindAllRoots();
      var schedules = await Schedule.returnAll();
      var count = schedules.length;
      var meta_views = await Meta.GetVisitorCount();
      var new_brow = await GetBrowserCounts();
      var laborers = await Labor.ReturnAllLaborers();

      if(req.path == "/admin/home" && schedules.length >= 3){
        count = 3;
      }

      for(var i = 0; i < count; i++){
        limited_schedules.push(schedules[i]);
      }

      for(var i = 0; i < schedules.length; i++){
        full_schedules.push(schedules[i]);
      }

      for(var i = 0; i < schedules.length; i++){
        total_potential_sales += schedules[i].total;
      }

      var new_data_to_page = {...data_rendered_to_page};

      new_data_to_page.limited_quotes = limited_schedules
      new_data_to_page.quotes = full_schedules;
      new_data_to_page.pageTitle = "Admin";
      new_data_to_page.people = laborers;
      new_data_to_page.path = req.path;
      new_data_to_page.total_potential_sales = total_potential_sales;
      new_data_to_page.meta.views = meta_views;
      new_data_to_page.meta.pages = roots;
      new_data_to_page.meta.brow = new_brow;
      new_data_to_page.active_path = req.path;

      return new_data_to_page;

}

exports.renderAllData = renderAllData;
exports.GetBrowserCounts = GetBrowserCounts;
exports.MakeFavoritesBeginningArray = MakeFavoritesBeginningArray;
