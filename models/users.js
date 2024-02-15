const mongoose=require("mongoose");
const validator=require("validator")
const usersschema=new mongoose.Schema({

    username : {type : String, required: true},
    email : {type:String,required:true,validate:[validator.isEmail]},
    password : {type :String,required:true},
    profile:{type:Array,required:true}


}) 
module.exports=mongoose.model("users",usersschema)      