const db = require("./../util/database.js");
var ObjectId = require('mongodb').ObjectId;

var days = ["Monday","Tuesday","Wendsday","Thursday","Friday","Saturday","Sunday"];
var profile_colors = ["#0CC0DF","#38B6FF"];

var seperateByHours = 2;
var numberOfJobs = 7;

var schedule = [];

function GenerateSchedule(seperateByHours, numberOfJobs,days){

  var arr = [];

  for(var i = 0; i < days.length; i++){

    var startTime = 7;
    var daySchedule = [];

    for(var k = 0; k < numberOfJobs; k+=1){

      var r = Math.random() * 100;
      var job = null;

      if(r > 60){
         job = "Chandler Pita Jungle"
      }

      daySchedule.push({
        job:job,
        time:startTime
      })

      startTime+= seperateByHours

    }

    arr.push({
      day:days[i],
      schedule:daySchedule
    })

  }

  return arr;

}

class Labor {

  constructor(name){
      this.name = name;
      this.color = profile_colors[Math.floor(Math.random() * profile_colors.length)];
      this.schedule = GenerateSchedule(seperateByHours,numberOfJobs,days);
  }

  static async FindAllLaborers(cb){

    var db_instance = db.GetDb();
    var data = await db_instance.collection("laborers").find({}).toArray();

    cb(data);

  }

  static async EditSchedule(data,cb){

    var db_instance = db.GetDb();
    var _id = new ObjectId(data.person_id);

    var person = await db_instance.collection("laborers").findOne({_id:_id});

    var new_person = {...person};
    if(data.name_of_job && data.address){
      new_person.schedule[data.day_id].schedule[parseInt(data.time_id)].job = data.name_of_job;
      new_person.schedule[data.day_id].schedule[parseInt(data.time_id)].address = data.address;
    }else{
      console.log( new_person.schedule[data.day_id].schedule[2]);
      new_person.schedule[data.day_id].schedule[parseInt(data.time_id)].job = "";
      new_person.schedule[data.day_id].schedule[parseInt(data.time_id)].address = "";
    }

    await db_instance.collection("laborers").replaceOne({_id:_id},new_person);

    return cb(true);

  }

  static async ReturnAllLaborers(){

    var db_instance = db.GetDb();
    var data = await db_instance.collection("laborers").find({}).toArray();

    return data;

  }

  static async DeleteAll(cb){

    var db_instance = db.GetDb();
    var action = await db_instance.collection("laborers").deleteMany();

    cb(action);

  }

   async AddLaborer(cb){

    var db_instance = db.GetDb();
    var data = await db_instance.collection("laborers").find({name:this.name}).toArray();

    if(data.length <=0){
       await db_instance.collection("laborers").insertOne(this);
       cb(true);
    }else{
      cb(false)
    }

  }

}


module.exports = Labor;
