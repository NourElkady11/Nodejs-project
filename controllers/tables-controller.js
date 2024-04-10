const bookingmodel=require("../models/bookingTables")
const http=require("../Response");
const validator=require("validator");
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


