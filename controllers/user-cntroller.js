const usermodel=require("../models/users")
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


const getallusers= async(req,res)=>{
    const get=await usermodel.find({},{"__v":false})
    res.json(get)

}
const resetPassword= async(req,res)=>{
    const email=req.body.email;
    console.log(email);
    if(validator.isEmail(email)){
        const checkEmails= await usermodel.find({email:email})
        if(checkEmails.length!=0){
            const newpassword = generator.generate({
                length: 10,
                numbers: true
            });
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'nourel2ady11@gmail.com',
                    pass: 'poqf zlex jkhh ttqy'
                },
                tls: {
                    rejectUnauthorized: false
                  }
            });
            
            const mailOptions = {
                from: 'nourel2ady11@gmail.com',
                to:email,
                subject: 'Sending Email using Node.js',
                text: `your password is ${newpassword}`
            };
                const hashedpass=await hashing.hash(newpassword,15)
                const update=await usermodel.updateOne({email:email},{password:hashedpass})
                const checkuserpdated= await usermodel.find({email:email})


    
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                  res.json({
                    message:"password has been sent to your email",
                    user:checkuserpdated
                  });
                }
            });
        }
        else{
            res.status(400).json({
                message:"Your acount dosent exist",
        })
        }

      
    }
    else{
        res.status(400).json({
            message:"Not valid email",
    })
    }

    



}
 
app.use(cookieParser())
const register= async(req,res)=>{
    // console.log(req);
    let f=1;
        const newuser=req.body;
        try{
            if(validator.isEmail(newuser.email))
            {
                const checkEmails= await usermodel.find({email:newuser.email}) 
    
                if(checkEmails.length==0){

                    if(newuser.username.length==0){
                        res.status(400).json({
                            msg:"Please enter your username"
                        })
                    }
                    else if(newuser.password.length==0){
                        res.status(400).json({
                            msg:"Please enter your password"
                        })
                    }  
                    if(newuser.password.length<5){
                        f=0;
                        res.status(400).json({
                            msg:"password must contain at least 5 charcters"
                        })
                    }
                    if(!validator.matches(newuser.password, /[a-zA-Z]/)){
                        f=0;
                        res.status(400).json({
                            msg:"password must contain letters"
                        })
    
                    }
                    if(validator.isUppercase(newuser.password)){
                        f=0;
                        res.status(400).json({
                            msg:"password must contain at least 1 lower case"
                        })

                    } 
                    if(validator.isLowercase(newuser.password)){
                        f=0;
                        res.status(400).json({
                            msg:" password must contain at least 1 upper case"
                        })

                       
                    } 
                    if(!validator.matches(newuser.password, /[1-9]/)){
                        f=0;
                        res.status(400).json({
                            msg:"password must contain numbers"
                        })

                        
    
                    }
                    if(!validator.matches(newuser.password, /[!@#$%^&*(),.?":{}|<>]/)){
                        f=0;
                        res.status(400).json({
                            msg:"password must contain special charcters"
                        })
                        
                    }
                    if(f==1){
                        if(newuser.password=="admin123"){
                            admin=1;
                        }
                        else{
                            admin=0;
                        }
                        const hashedpass=await hashing.hash(newuser.password,15)
                        const profiles=[]
                        const images=req.files
                        for(i=0;i<images.length;i++){
                            profiles.push(images[i].filename)
                        }  
                        //file dh key gowa el request feeh kol tafasel l file lly gaylyy
                        if(admin==0){
                            const user=await usermodel.create({
                                username:newuser.username,
                                email:newuser.email,
                                password:hashedpass,
                                profile:profiles,
                                isadmin:false
                            })  
                        }
                        else{
                            const user=await usermodel.create({
                                username:newuser.username,
                                email:newuser.email,
                                password:hashedpass,
                                profile:profiles,
                                isadmin:true
                            })  
                        }
                            const token=jwt.sign({
                                username:newuser.username,
                                email:newuser.email,
                                isadmin:newuser.isadmin
                            },process.env.MYSECRETKEY,{expiresIn:"1h"});
                            res.status(200).header("Token",token).json({
                                status:http.SUCCESS,
                                data:[user],
                                token:token
                    })
                     
                    // res.cookie("token",token,{httpOnly: true })
                    }
                }
                else{
                    res.status(400).json({
                        msg:"this user is already exist in the dataBase",
                        data:[]
                    })  
                }
            }
            else
            {
                if(newuser.email.length>0){
                    res.status(400).json({
                        msg:"Not valid email",
                })
                }else if(newuser.email.length==0){
                    res.status(400).json({
                        msg:"please enter your email",
                    })
                }
          
            }
        }
        catch{
                res.status(400).json({
                    msg:" OOPS Data base connection error"
                })
        }
        
    }

// const getregister=async(req,res)=>{
//         res.send(req.headers)
// }    




 

const login= async(req,res)=>{

    const logingUser=req.body;
    // const tokenCaptured=req.headers.token;
    // console.log(req.headers);
 
    try{
        const user=await usermodel.find({email:logingUser.email},{"__v":false})
        // if(user.isadmin){
        //     res.status(200).json({
        //         status:"Admin Found",
        //         data:[user],
        //         })
        // }
        // else{
        //     res.status(400).json({
        //         msg:"You are not an admin",
        // })
        // }
        if(user.length==0){
            res.status(400).json({
                msg:"User Not Found",
        })
        }
        else{   
            hashing.compare(logingUser.password,user[0].password,(err,result)=>{
                if(result==true){
                res.status(200).json({
                status:"user Found",
                data:[user],
                })
                }
                else{
                    res.status(400).json({
                     status:http.ERROR,
                    msg:"password is incorrect"
                 })
                }
            })
            } 

        }
    catch{    
        res.status(400).json({
            status:http.FAIL,
            msg:"Database error"
        })

    }


}

 
module.exports={
    resetPassword,
    getallusers,
    register,
    login
    // getregister
}
 