jwt=require("jsonwebtoken");
const auth= async(req,res,next)=>{

tokenCaptured=req.headers.token;

try{
    const ver=await jwt.verify(tokenCaptured,process.env.MYSECRETKEY)
    next();
}
catch{
    res.status(403).json({
        "message":"TOKEN IS NOT AVALIABLE try Login again"
    })
}


}

module.exports=auth;