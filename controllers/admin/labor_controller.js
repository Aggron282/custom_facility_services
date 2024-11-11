const Laborer = require("./../../models/laborer.js");

const {generateHash} = require('random-hash');

const enums = require("./../../util/labor_enums.js");

const ReturnAllLaborers = async () => {
  const laborers = await Laborer.find({});
  return laborers;
}

const GetAllLaborers =  async ()=>{
  const laborers = await ReturnAllLaborers();
  res.json({laborers:laborers});
}

const AddLaborer = async (req,res) => {

  var {name,email,username,hired_date,position} = req.body;

  var new_laborer = new Laborer();

  var data = await ConfigureLaborer(name,email,username,hired_date,position);

  new_laborer.email = data.email;
  new_laborer.username = data.username;
  new_laborer.password = data.password;
  new_laborer.hired_date = data.hired_date;
  new_laborer.position = data.position;
  new_laborer.schedule = data.schedule;
  new_laborer.accounting = data.accounting;
  new_laborer.background_info = data.background_info;
  new_laborer.name = data.name;

  new_laborer.save().then((feedback)=>{
    if(feedback){
      res.json(true);
    }else{
      res.json(false);
    }

  }).catch((err)=>{
    console.log(err);
    res.json(false);
  });

}

const EditLaborerBasic = (req,res) => {

  var {name,email,position} = req.body;

  var data = ConfigureLaborer(name,email,username,password,hired_date,position);

}

const ConfigureLaborer = async (name,email,username,password,hired_date,position,accounting,background_info) => {

  var data = {}

  data.name = name ? name : "N/A";
  data.username = username ? username : name;
  data.password = password ? password : generateHash();
  data.hired_date = hired_date ? hired_date : new Date();
  data.position = position && typeof position == "object" ? position : enums.Unassigned;
  data.email = email ? email : null;
  data.schedule = [];

  var accounting_config = {
    total_pay:0,
    hourly_rate:data.position.rate,
    weekly_report:[]
  }

  var background_info_config ={
    full_name: name,
    age:null,
    background_check:null,
    profile_img:null
  }

  if(typeof accounting == "object"){

    if(accounting.total_pay){
        data.accounting.total_pay = accounting.total_pay
    }
    if(accounting.hourly_rate){
        data.accounting.hourly_rate = accounting.hourly_rate
    }
    if(accounting.weekly_report){
        data.accounting.weekly_report = accounting.weekly_report
    }

  }else{
    data.accounting = accounting_config;
  }

  if(typeof background_info == "object"){

      if(background_info.full_name){
          data.background_info.full_name = background_info.full_name
      }
      if(background_info.background_check){
          data.background_info.background_check = background_info.background_check
      }
      if(background_info.age){
          data.background_info.age = background_info.age
      }
      if(background_info.profile_img){
          data.background_info.profile_img = background_info.profile_img
      }

  }else{
    data.background_info = background_info;
  }

  return data;

}

module.exports.GetAllLaborers = GetAllLaborers;
module.exports.AddLaborer = AddLaborer;
module.exports.ReturnAllLaborers = ReturnAllLaborers;
