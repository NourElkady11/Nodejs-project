jwt=require("jsonwebtoken");
const auth= async(req,res,next)=>{

tokenCaptured=req.headers.token;

try{
    const ver=await jwt.verify(tokenCaptured,process.env.MYSECRETKEY)
    // 7ot fel token type w check b2a dh admin wala user lama yegy yro7 lel routes w howa bay login law da5l b email w pass mo3aynen yasglhom ka admin fel data base 3ashan y3ml 
    next();
}
catch{
    res.status(403).json({
        "message":"TOKEN IS NOT AVALIABLE try Login again"
    })
}
}

module.exports=auth;