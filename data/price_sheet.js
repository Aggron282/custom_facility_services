const db = require("./../util/database.js");
var ObjectId = require('mongodb').ObjectId;

class PriceSheet {

  constructor(key,price,half_price,name){
      this.key = key;
      this.price = price;
      this.half_price = half_price;
      this.name = name;
  }

  async save(){

    var hasFound = false;
    var db_instance = db.GetDb();
    var price_sheet = await db_instance.collection("price_sheet").findAll(this).toArray();

    async function saveToDB(){

      db_instance.collection("price_sheet").insertOne(this).then((result)=>{
        console.log(result)
      });

    }

    async function replaceInDb(_id){

     await db_instance.collection("price_sheet").replaceOne({_id:_id},this);

   }

    if(price_sheet.length <= 0){
        await saveToDB();
    }else{

      for(var i = 0; i < price_sheet.length; i++){

        if(this.key == price_sheet[i]){

          var _id = new ObjectId(price_sheet[i]._id);

          hasFound = true;
          await replaceInDb(_id);

        }

      }
      if(!hasFound){
        await saveToDB();
      }

    }

  }


  static async GetPriceSheet(cb){

    var db_instance = db.GetDb();

    db_instance.collection("price_sheet").findAll().then((result)=>{
      cb(result);
    });

  }

}


module.exports = PriceSheet;
