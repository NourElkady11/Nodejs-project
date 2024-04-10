const validator=require("validator");

const reservationMiddleware=(req,res,next)=>{
    const reservingUser=req.body;
    if(validator.isEmpty(reservingUser.username) || validator.isEmpty(reservingUser.date) || validator.isEmpty(reservingUser.numberOfPersons)){
        res.status(400).json({
            message:"please enter the required inputs",
        })
    }
    else{
        next();
    }
}
module.exports=reservationMiddleware