const controller=require("../controllers/prod-controller.js");
const middlewares=require("../Middlewars/productsmiddlewares.js");
const express = require('express');
const router=express.Router();
const prodAuth=require("../Middlewars/productsmiddlewares.js")
const fileAuth=require("../Middlewars/fileMiddleware.js")
const uploads=require("../Middlewars/uploadsMiddleware.js");



router.route("/get")
.get(controller.Getalldata);

router.route("/products/:tittle")
.put(controller.updateManyProduct)

router.route("/products/:tittle")
.delete(controller.DeleteManyProd)

router.route("/products/Add")
.post(/*uploads.array("images",10),fileAuth,prodAuth,*/controller.Addproducts)

router.route("/product/:id")
.put(controller.updateOneProduct)
.delete(controller.DeleteOneProd)
.get(controller.gettingSingleprod)



module.exports=router