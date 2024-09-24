const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

let _db;

var url = "mongodb+srv://marcokhodr116:sableye12@cluster0.6s1n3.mongodb.net/?retryWrites=true&w=majority";
// mJsfoRL1aIkSb3d2
const MongoConnect = (cb) => {

  MongoClient.connect(url).then((client)=>{
    _db = client.db("CFS");
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
