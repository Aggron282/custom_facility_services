const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Laborer = new Schema (
  {
    name:{
      type:String,
      required:true
    },
    email:{
      type:String,
      required:false
    },
    hired_date:{
      type:Date,
      require:false
    },
    username:{
      type:String,
      required:false
    },
    password:{
      type:String,
      required:false
    },
    position:{
      type:String,
      required:false
    },
    schedule:{
      type:Array,
      required:false
    },
    accounting:{
      total_pay:{
        type:Number,
        required:false
      },
      hourly_rate:{
        type:Number,
        required:false
      },
      weekly_report:{
        type:Array,
        required:false
      }
    },
    background_info:{
        full_name:{
          type:String,
          required:false
        },
        age:{
          type:Number,
          required:false
        },
        background_check:{
          type:Object,
          required:false
        },
        profile_img:{
            type:String,
            required:false
        }
    }
  }
)


module.exports = mongoose.model("laborer",Laborer);