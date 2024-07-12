var fs  = require("fs");
var path = require("path");
var express = require("express");
var expressLayouts = require('express-ejs-layouts');
var user_routes = require("./routes/user/user_routes.js");
var admin_routes = require("./routes/admin/admin_routes.js");
var db = require("./util/database.js");
var bodyParser = require("body-parser");
var axios = require("axios");
var app = express();
var port = process.env.PORT || 3002;
app.use(bodyParser.json({extended:true}));

app.use(bodyParser.urlencoded());

app.use(express.static('public'));
app.use(user_routes);
app.use(admin_routes);


app.set("view engine","ejs");

db.MongoConnect(()=>{

  app.listen(port,async()=>{
    


    // var days = ["Monday","Tuesday","Wendsday","Thursday","Friday","Saturday","Sunday"];
    // var seperateByHours = 2;
    // var numberOfJobs = 8;
    // var schedule = [];
    //
    // function GenerateSchedule(seperateByHours, numberOfJobs,days){
    //   var arr = [];
    //   for(var i = 0; i < days.length; i++){
    //     var startTime = 7;
    //     var daySchedule = [];
    //     for(var k = 0; k < numberOfJobs; k++){
    //
    //       daySchedule.push({
    //         job:"Job Name",
    //         time:startTime
    //       })
    //       startTime += 2
    //     }
    //     arr.push({
    //       day:days[i],
    //       schedule:daySchedule
    //     })
    //   }
    //   return arr;
    // }
    // console.log(GenerateSchedule(seperateByHours, numberOfJobs,days)[0].schedule[0])
    // console.log("Website is running on localhost:"+port);
  });

});
