const validator=require("validator");

const loginMiddleware=(req,res,next)=>{
    const logginguser=req.body;
    if(validator.isEmpty(logginguser.email) || validator.isEmpty(logginguser.password)){
        res.status(400).json({
            message:"please enter the required inputs",
        })
    }
    else{
        next();
    }
}
module.exports=loginMiddleware