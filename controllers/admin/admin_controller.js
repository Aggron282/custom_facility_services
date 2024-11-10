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
var prospectController = require("./prospect_controller.js");
var sales = require("./../../util/sales.js");

var enums = require("./../../util/enums.js");

const {validationResult} = require("express-validator");

var utility = require("./admin_utility.js");

var server = require("./../../server.js");

const { compileFunction } = require("vm");

var data = null;

const GetIndexPage = async (req,res,next) => {

     if(!data){
       data = await utility.renderAllData(req,res);
     }

     var page_counter = 0;

    if(req.params){
      page_counter = req.params.prospects_page ? req.params.prospects_page  : 0;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

    var weekly_prospects = await Prospect.find({
      time_created: {
        $gte: today,
        $lte: oneWeekFromNow
      }
    });

    var page_data = utility.GetPageData(page_counter,7,data.prospects);
    var all_prospects =await Prospect.find({});
    var params = req.params;

    var toggle_quotes = !params.isCompleted || params.isCompleted == "0" ? 0 : 1;

    data.toggle = toggle_quotes;

    if(page_data){
      data.page_counter = page_data.page_counter;
      data.post_per_page = page_data.posts_per_page;
      data.page_length = page_data.page_length;
      data.next_page = page_data.next_page;
      data.prev_page = page_data.prev_page;
      data.start_counter = page_data.start_counter;
      data.first_page = page_data.first_page;
    }
    data.weekly_sales = sales.GetSales(weekly_prospects);
    data.total_sales = sales.GetSales(all_prospects);

    res.render(path.join(rootDir,"views","/admin/index.ejs"),data);

}

module.exports.GetIndexPage = GetIndexPage;
