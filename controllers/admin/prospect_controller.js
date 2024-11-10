var Prospect = require("./../../models/prospects.js");
var path = require("path");
var rootDir = require("./../../util/path.js");
var ObjectId = require("mongoose").Types.ObjectId;
var Owner = require("./../../models/owner.js");
var enums = require("./../../util/enums.js");
const {validationResult} = require("express-validator");
var utility = require("./admin_utility.js");
var admin_controller = require("./admin_controller.js");
var sales = require("./../../util/sales.js")
var server = require("./../../server.js");

const GetProspectPage = async (req,res,next) => {

    var data = await utility.renderAllData(req,res);

    var new_data_to_page = {...data};
    var params = req.params;
    var toggle_quotes = !params.isCompleted || params.isCompleted == "0" ? 0 : 1;
    const today = new Date();

    var page_counter = 0;

     if(req.params){
       page_counter = req.params.prospects_page ? req.params.prospects_page  : 0;
     }
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
    new_data_to_page.weekly_sales = sales.GetSales(weekly_prospects);
    new_data_to_page.total_sales = sales.GetSales(all_prospects);

    new_data_to_page.toggle = toggle_quotes
    new_data_to_page.path = req.path;
    new_data_to_page.pageTitle = "Admin Quotes";

    res.render(path.join(rootDir,"views","/admin/quote.ejs"),new_data_to_page);

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
    if(prospect.status == 4){
      return;
    }

    var update_prospect = {$set:{status:4}};

    const exec_prospect = await Prospect.findOneAndUpdate({_id:_id},update_prospect);
    const exec = await Owner.findOneAndUpdate({_id:new ObjectId(req.owner._id)},update);

    res.json(true);

  }
  else{
    res.json(false);
  }

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

const GetAllProspects = async (req,res) =>{

  var return_all_prospects = await ReturnAllProspects();
  res.json({prospects:return_all_prospects});

}

const ReturnAllProspects = async () =>{

  var all_p = await Prospect.find({});
  return all_p;

}

const GetWeeklyProspects = async (req,res) => {

  var data = await ReturnWeeklyProspects();
  res.json({prospects:data});
}

async function ReturnWeeklyProspects(){

  const today = new Date();

  today.setHours(0, 0, 0, 0);

  const oneWeekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

  var all_p = Prospect.find({
    time_created: {
      $gte: today,
      $lte: oneWeekFromNow
    }
  });

  return all_p;

}

const DeleteProspect = async (req,res,next)=>{

  var body = req.body;

  const delete_ = await Prospect.deleteOne({_id:new ObjectId(body._id)});

  res.json(delete_);

}

const ToggleProspects = async (req,res,next) =>{

  if(!data){
    data = await utility.renderAllData(req,res);
  }

  var toggle = parseInt(req.params.toggle);

  if(!toggle){
    return;
  }

  data.toggle = req.body.toggle;

}

const GetSales = (req,res) => {
  var prospects = req.body.prospects;
  var sales_ = sales.GetSales(prospects);
  res.json(sales_);
}

module.exports.GetSales = GetSales;
module.exports.ReturnWeeklyProspects = ReturnWeeklyProspects;
module.exports.GetWeeklyProspects = GetWeeklyProspects;
module.exports.DeleteProspect = DeleteProspect;
module.exports.AddProspectDetails = AddProspectDetails;
module.exports.AddProspect= AddProspect;
module.exports.ToggleProspects = ToggleProspects;
module.exports.ChangeProspectStatus = ChangeProspectStatus;
module.exports.CompleteProspectJob = CompleteProspectJob;
module.exports.GetAllProspects = GetAllProspects;
module.exports.GetProspectPage = GetProspectPage;
module.exports.ReturnAllProspects = ReturnAllProspects;
