const db = require("./../util/database.js");

class Schedule {

  constructor(data){
    this.name = data.name;
    this.date = data.date;
    this.time = data.time;
    this.windowCount = data.windowCount;
    this.address = data.address;
  }

  save(){

    var db_instance = db.GetDb();

    db_instance.collection("schedules").insertOne(this).then((result)=>{
    }).catch(err => {console.log(err)})

  }

  static async findAll(cb){

    var db_instance = db.GetDb();
    
    var schedules =  await db_instance.collection("schedules").find({}).toArray();

    cb(schedules);

  }

}


// Structure of the schedule data

// User enters data into the form and submits
// Saves all the data in object that will be pushed into an array and saved
// On admin side populate the schedule page with all the forms submitted, make an icon that when more then one is pressed make a delete button that will delete all the selected buttons


module.exports =  Schedule;
