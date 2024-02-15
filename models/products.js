const mongoose=require("mongoose");
const productschema=new mongoose.Schema({

    tittle : {type : String, required: true},
    price : {type:Number,required:true},
    status : {type :String,required:true},
    images:{type:Array,required:true},

}) 
 
module.exports=mongoose.model("prods",productschema)  