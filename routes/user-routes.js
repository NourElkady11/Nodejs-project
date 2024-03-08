const { cookie } = require("express-validator");
const UserController=require("../controllers/user-cntroller.js");
const middlewares=require("../Middlewars/productsmiddlewares.js");
const express = require('express');
const router=express.Router();
const authentication=require("../Middlewars/authentication.js");
const uploads=require("../Middlewars/uploadsMiddleware.js");
const { escape } = require("validator");
const logAuth=require("../Middlewars/loginMiddleware.js");
const regAuth=require("../Middlewars/registerMiddleware.js");
const fileAuth=require("../Middlewars/fileMiddleware.js");


router.route("/get")
.get(authentication,UserController.getallusers);

// router.route("/chat")
// .get(UserController.chatpage);

router.route("/login")
.post(logAuth,UserController.login)

router.route("/reset-password")
.post(UserController.resetPassword)

router.route("/register")
// .post(uploads.array("profile",10),fileAuth,regAuth,UserController.register)
.post(UserController.register)


//single takes tha name at the form






// router.route("/Register")
// .get(UserController.getregister)

module.exports=router