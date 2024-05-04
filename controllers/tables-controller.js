const reservationModel=require("../models/bookingTables")
const http=require("../Response");
const validator=require("validator");
const usermodel=require("../models/users")
const hashing=require("bcrypt");
const jwt=require("jsonwebtoken");
const cookieParser = require('cookie-parser');
const express = require('express');
const { header } = require("express-validator");
const { log } = require("console");
const nodemailer=require("nodemailer")
const app = express();
const generator = require('generate-password');
const { Admin } = require("mongodb");


const reservetable= async(req,res)=>{
    const reservationDerails=req.body;
    const get=await reservationModel.find({date:reservationDerails.date},{"__v":false})
    if(get.length==0){
            const table = await reservationModel.create({
            username:reservationDerails.username,
            date:reservationDerails.date,
            numberOfPersons:reservationDerails.numberOfPersons
        })
        console.log(table);
        res.status(200).json({
            status:"Created succefully",
            data:table
        })
    }
    else{
        res.status(400).json({
            status:"Sorry this appointment is already reserved",
        })

    }
}

module.exports={
    reservetable,

}
