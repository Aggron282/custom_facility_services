const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Owner = new Schema (
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:false
    },
    time_created:{
      type:Date,
      require:false
    },
    username:{
      type:String,
      required:false
    },
    secret_key:{
      type:String,
      required:false
    },
    accounting:{
      type:Object,
      required:false
    },
    laborers:{
      type:Array,
      required:false
    },
    meta:{
      type:Object,
      required:false
    },
    prospects:{
        type:Array,
        required:false
    }
  }
)


module.exports = mongoose.model("owner",Owner);