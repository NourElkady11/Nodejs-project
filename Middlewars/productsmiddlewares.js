const validator=require("validator");

const newproduct=(req,res,next)=>{
    const product=req.body;
    // console.log(product);
    if(validator.isEmpty(product.tittle)){
        res.status(400).json({
            message:"product must contain tittle",
        })
    }else if(validator.isEmpty(product.price)){
        res.status(400).json({
            message:"product must contain price",
        })
    }
    else if(validator.isEmpty(product.status)){
        res.status(400).json({
            message:"product must contain status",
        })
    }
    else{
        next();
    }
}
module.exports=newproduct