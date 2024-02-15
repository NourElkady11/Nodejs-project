const validator=require("validator");

const registerMiddleware=(req,res,next)=>{
    const logginguser=req.body
    console.log(logginguser);
    if(validator.isEmpty(logginguser.email) || validator.isEmpty(logginguser.password) || validator.isEmpty(logginguser.username)){
        res.status(400).json({
            message:"please enter the required inputs",
        })
    }
    else{
        next();
    }
}
module.exports=registerMiddleware 