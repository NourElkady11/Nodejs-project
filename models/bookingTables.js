const mongoose=require("mongoose");
const bookingschema=new mongoose.Schema({

    username : {type : String, required: true},
    date : {type :String,required:true},
    numberOfPersons : {type:Number,required:true},
   

}) 

module.exports=mongoose.model("tables",bookingschema)  