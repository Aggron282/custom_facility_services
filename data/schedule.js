const db = require("./../util/database.js");

var ObjectId = require('mongodb').ObjectId;

const price_sheet = require("./../config/pricing.js");

class Schedule {

  constructor(name,address,windows,date,time,small,medium,large,screens){

      this.name = name;
      this.address = address;
      this.windows = windows;
      this.large = large;
      this.small = small;
      this.medium = medium;
      this.screens = screens;
      this.date = date;
      this.time = time;
      this.total = 0;
      this.outside = 0;
      this.isFavorite = false;

  }

  async save(){

    var db_instance = db.GetDb();

    var w = await db_instance.collection("schedules").deleteMany({});
    db_instance.collection("schedules").insertOne(this).then((result)=>{

    }).catch(err => {console.log(err)});

    var v = await db_instance.collection("schedules").find().toArray();

  }

  static async MakeFavorite(id,toggle,cb){

      var db_instance = db.GetDb();
      var data = await db_instance.collection("schedules").updateOne({ _id: new ObjectId(id)}, {$set: {isFavorite: toggle}});

      if(data){
        cb(true)
      }else{
        cb(false);
      }

  }

  static async returnAll(){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").find({}).toArray();

    return schedules;

  }


  static async findAll(cb){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").find({}).toArray();

    cb(schedules);

  }

  static async deleteAll(cb){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").deleteMany();

  }

  static async deleteThese(quotes,cb){

    var db_instance = db.GetDb();
    var flag = false;

    if(quotes.length >= 0){

      for ( var i = 0; i < quotes.length; i++){
        var objectID = new ObjectId(quotes[i])
        var schedules =  await db_instance.collection("schedules").deleteOne({_id:objectID});
      }

      flag = true;

    }

    cb(flag);

  }

  static async completeThese(quotes,cb){

    var db_instance = db.GetDb();
    var flag = false;

    await db_instance.collection("completed").deleteMany({});

    if(quotes.length >=0){

      for ( var i = 0; i < quotes.length; i++){

        var objectID = new ObjectId(quotes[i]);
        var quote = await db_instance.collection('schedules').findOne({_id:objectID});
        var schedules =  await db_instance.collection("completed").insertOne(quote);

        await db_instance.collection("schedules").deleteOne({_id:objectID});
        await db_instance.collection("completed").find({}).toArray();

      }

      flag  = true;

    }

    cb(flag);

  }

  total_all_prices(){


    var total = 0;

    for(var i = 0; i < this.new_sizes.length; i++){

      if(this.new_sizes[i] && price_sheet[i].key){

        for(var k = 0; k < price_sheet.length; k++){

            if(this.new_sizes[i].key == price_sheet[k].key)
            {
              total += price_sheet[k].price * this.new_sizes[i].count;
            }

        }

      }

    }

    this.total = Math.ceil(total);
    this.outside = Math.round(total * .6);

  }

}


module.exports = Schedule;
