var Schedule = require("./../../data/schedule.js");
var metaController = require("./meta_controller.js");
var Prospects = require("./../../models/prospects.js");
var labor_controller = require("./labor_controller.js");

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

const GetPageData = (counter,posts_per_page,page_data) => {

  page_counter = parseInt(counter);


  if(isNaN(page_counter)){
    page_counter = 0;
  }

  var page_length = Math.floor(page_data.length / posts_per_page);

  if(isNaN(page_length) || !page_length){
    page_length = 1;
  }

  var data = {
    page_counter:page_counter,
    posts_per_page : posts_per_page,
    next_page :  page_counter + 1 > page_length ? page_length : page_counter + 1,
    prev_page : page_counter - 1 < 0 ? 0 : page_counter - 1,
    start_counter : page_counter <= 0 ? 0 : page_counter,
    first_page : 0
  };


  return data;

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

const renderAllData = async(req,res,toggle)=>{

      var limited_prospects = [];
      var full_prospects = [];
      var total_potential_sales = 0;
      // var roots = await Meta.FindAllRoots();
      var prospects = await Prospects.find({});
      var count = prospects.length;
      var laborers = await labor_controller.ReturnAllLaborers();
      // var meta_views = await Meta.GetVisitorCount();
      // var new_brow = await GetBrowserCounts();

      for(var i = 0; i < prospects.length; i++){
        full_prospects.push(prospects[i]);
      }

      for(var i = 0; i < prospects.length; i++){
        total_potential_sales += prospects[i].total;
      }

      var new_data_to_page = {...data_rendered_to_page};

      new_data_to_page.prospects = prospects;
      new_data_to_page.pageTitle = "Admin";
      new_data_to_page.path = req.path;
      new_data_to_page.laborers = laborers;
      new_data_to_page.total_potential_sales = total_potential_sales;
      new_data_to_page.meta.views = 0;
      new_data_to_page.meta.pages = 0;
      new_data_to_page.meta.brow = 0;
      new_data_to_page.active_path = req.path;
      new_data_to_page.toggle = 0;

      return new_data_to_page;

}

exports.renderAllData = renderAllData;
exports.MakeFavoritesBeginningArray = MakeFavoritesBeginningArray;
exports.GetPageData = GetPageData;
