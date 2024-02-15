const controller=require("../controllers/prod-controller.js");
const middlewares=require("../Middlewars/productsmiddlewares.js");
const express = require('express');
const router=express.Router();
const prodAuth=require("../Middlewars/productsmiddlewares.js")
const fileAuth=require("../Middlewars/fileMiddleware.js")
const uploads=require("../Middlewars/uploadsMiddleware.js");



router.route("/get")
.get(controller.Getalldata);

 
router.route("/products")
.patch(controller.updateProduct)
.delete(controller.DeleteProd)
.get(controller.gettingSingleprod)
.post(uploads.array("images",10),fileAuth,prodAuth,controller.Addproducts)


module.exports=router