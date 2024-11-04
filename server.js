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
var connection_name = require("./util/connnection_name.js");
var mongoose = require("mongoose");
var Owner = require("./models/owner.js");
var session = require("express-session");
var MongoDBStore = require('connect-mongodb-session')(session);
var admin_controller = require("./controllers/admin/adminController.js");
app.use(bodyParser.json());
app.use(session({secret:"0gunio4tngvjnvjwnvjjvnirjwnvbirjnb",saveUninitialized:false,store:StoreSession}));


app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(user_routes);
app.use(admin_routes);

const days_constant = 7;
const seconds = 1000;
const minutes = 60 * seconds;
const hour = minutes * 60;
const days_unit = hour * 24;
const days_to_email = days_unit * days_constant
var countdown = 0;
const throttle_email = 2 * hour;


var StoreSession =  new MongoDBStore({
  uri:connection_name,
  collection:"session"
});

function CheckIfCanEmail(manual){
  if(!manual){
    return true;
  }
  if(countdown <= 0){
    countdown = throttle_email;
    return true;
  }else{
    return false;
  }
}

app.set("view engine","ejs");

db.MongoConnect((result)=>{
 
  mongoose.connect(connection_name).then((s)=>{

    setInterval(()=>{admin_controller.EmailNewKey(false)},days_to_email)
    setInterval(()=>{countdown - 1, 1000});
    app.listen(port,async()=>{
      console.log(port);
    });

  });

});


module.exports.CheckIfCanEmail = CheckIfCanEmail;