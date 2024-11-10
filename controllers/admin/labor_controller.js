var Labor = require("./../../data/labor.js");
var path = require("path");
var rootDir = require("./../../util/path.js");


const DeleteSchedule = async (req,res,next) => {

  var data  = req.body;

  data.name_of_job = "";
  data.address = "";

  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const EditSchedule = async (req,res,next) => {

  var data  = req.body;

  await Labor.EditSchedule(data,()=>{
    res.redirect("/admin/schedule");
  });

}

const ShowSchedule = async (req,res,next) => {

      var laborers = await Labor.ReturnAllLaborers();

      var new_data_to_page = {...data_rendered_to_page};
      new_data_to_page.pageTitle = "Admin Schedules";
      new_data_to_page.path = req.path;
      new_data_to_page.people = laborers;

      res.render(path.join(rootDir,"views","/admin/schedule_detail.ejs"),new_data_to_page);

}
const AddLaborer = async(req,res,next)=>{

  var person = req.body.first + " " + req.body.last;

  var new_laborer = new Labor(person);

  new_laborer.AddLaborer((data)=>{
    res.redirect('/admin/home');
  });

}

module.exports.EditSchedule = EditSchedule;
module.exports.ShowSchedule = ShowSchedule;
module.exports.DeleteSchedule = DeleteSchedule;
module.exports.AddLaborer = AddLaborer;
