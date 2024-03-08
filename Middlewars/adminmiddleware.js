jwt=require("jsonwebtoken");
const auth= async(req,res,next)=>{
tokenCaptured=req.headers.token;
    const ver=await jwt.verify(tokenCaptured,process.env.MYSECRETKEY)
    if(ver.isadmin==true){
        next();
    }
    else{

    }


}
module.exports=auth;