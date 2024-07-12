const Schedule = require("./../../data/schedule.js");
const Meta = require("./../../data/meta.js");
const Pricing = require("./../../config/pricing.js");
const Clients = require("./../../config/clients.js");
const ShowcaseHeadings = require("./../../config/showcase_headings.js");
const BeforeAndAfterConfig = require("./../../config/before_and_after_config.js");
const Values = require("./../../config/values.js");


function returnLockClass(lock){

  if(lock){
    return "lock";
  }else{
    return " ";
  }

}

function AddPageView(req){
    const ipAddress = req.ip;
    console.log(ipAddress)
}

async function  getData(req){

  var data = req.body;
  var name = req.body.firstName;
  var sizes = [data.smWindowCount,data.mdWindowCount,data.lgWindowCount,data.screenCount];
  var fixed_sizes = ["small","medium","large","screen"];
  var configured_sizes = [];
  var windows = [];
  var counter = 0;

  sizes.forEach((size)=>{

    var new_window_size = {
      key:fixed_sizes[counter],
      count:size
    }

    counter++;
    configured_sizes.push(new_window_size);

  })

  var config = {
    name:name,
    windows:configured_sizes,
    smWindowCount:{key:"small",count:data.smWindowCount},
    mdWindowCount:{key:"medium",count:data.mdWindowCount},
    screenCount:{key:"screen",count:data.screenCount},
    lgWindowCount:{key:"large",count:data.lgWindowCount},
    address:data.address
  };

  var new_schedule = new Schedule(config.name,config.address,windows,config.date,config.time,config.windows);

  const response = await new_schedule.save();

  modal = {
    wrapper:"active_wrapper",
    modal:"active_modal",
    outside:new_schedule.outside,
    total_price:Math.round(new_schedule.total)
  }

  lock = true;

  return new_schedule;

}

exports.getData = getData;
exports.AddPageView = AddPageView;
exports.returnLockClass = returnLockClass;
