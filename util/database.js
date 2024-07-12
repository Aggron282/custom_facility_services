const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

var url = "mongodb+srv://marcokhodr116:thirdpi1@cluster0.9nkwh9b.mongodb.net/?retryWrites=true&w=majority";

const MongoConnect = (cb) => {

  MongoClient.connect(url).then((client)=>{
    _db = client.db("cfs");
    cb("Success")
  });

}

const GetDb = () => {

  if(_db){
    return _db;
  }
  else{
    return null;
  }

}


exports.MongoConnect = MongoConnect;
exports.GetDb = GetDb;
