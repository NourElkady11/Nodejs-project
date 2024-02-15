const {validationResult}=require("express-validator");
const pmodel=require("../models/products.js");
const HTTP=require("../Response.js");
const runningServer=()=>{
    console.log("server is running");
};

const Getalldata= async (req,res)=>{
   
    try{
        // pagination
        const limit=req.query.limit || 10;
        const page=req.query.page || 1;
        const skip=(page -1 )*limit

        const get = await pmodel.find().limit(limit).skip(skip)

        if(get.length==0){
            res.status(404).json({
                "status":HTTP.FAIL,
                "data":[]
            })
        }
        else{
            res.status(200).json({
                "status":HTTP.SUCCESS,
                "data":[get]
            })
        }
        res.end()

    }
    catch{
        res.status(404).json({
            "status":HTTP.ERROR,
            "message":"Server falied"
        })

    }
    

}


const gettingSingleprod=async(req,res)=>{

    try{

        const get = await pmodel.find({
            tittle: "iphone-8"
        }).select({"_id":0,"price":1})

        if(get.length==0){
            res.status(404).json({
                "status":HTTP.FAIL,
                "data":[]
            })
        }
        else{
            res.status(200).json({
                "status":HTTP.SUCCESS,
                "data":[get]
            })
        }
        res.end()

    }
    catch{
        res.status(404).json({
            "status":HTTP.ERROR,
            "message":"Server falied"
        })

    }
    
}

const Addproducts=async(req, res) => { 
     
    try{

        const newproduct=req.body;
        const imgs=[]
        const images=req.files
        for(i=0;i<images.length;i++){
            imgs.push(images[i].filename)
        } 
        console.log(imgs);

        //a5er 5atwaaaa wnta bat7ot sora fel databasee
        const document=await pmodel.create({
            tittle:newproduct.tittle,
            price:newproduct.price,
            status:newproduct.status,
            images:imgs
        });
        console.log(document);
            res.status(200).json({
                status:HTTP.SUCCESS,
                data:[document]
            })
    }
    catch{
        res.status(404).json({
            "status":HTTP.ERROR,
            "message":"Server falied"
        })

    }
}

const updateProduct = async (req,res)=>{

    try{
        const update= await pmodel.updateMany(
            {"tittle":"iphone-14pro"},
            {
                "price":1000000,
                "tittle":"iphone-14pro-updated",
            }
            
            //?set m4 lazem f mongoose 
        ) 

        if(update.length==0){
            res.status(404).json({
                "status":HTTP.FAIL,
                "data":[]
            })
        }
        else{
            res.status(200).json({
                "status":HTTP.SUCCESS,
                "data":[update]
            })
        }
        res.end()

    }
    catch{
        res.status(404).json({
            "status":HTTP.ERROR,
            "message":"Server falied"
        })

    }


}



const DeleteProd= async(req,res)=>{
    
    try{
        const del=await pmodel.deleteMany({"tittle":null})
        if(del.length==0){
            res.status(404).json({
                "status":HTTP.FAIL,
                "data":[]
            })
        }
        else{
            res.status(200).json({
                "status":HTTP.SUCCESS,
                "data":[del]
            })
        }
        res.end()

    }
    catch{
        res.status(404).json({
            "status":HTTP.ERROR,
            "message":"Server falied"
        })

    }

    
}

module.exports={
    runningServer,
    Addproducts,
    gettingSingleprod,
    updateProduct,
    DeleteProd,
    Getalldata
}
// function knapsack(p,wt,m){
//     n=p.length;
//     for (let i = 0; i <=n ; i++) {
//         for (let w = 0; w <= m; w++) {
    
//             if(i==0 || w==0){
    
//                 k[i][w]=0;
//             }
//             else if(wt[i]<=w){
//                 k[i][w]=Math.max(p[i]+k[i-1][w-wt[i]],k[i-1][w])
//             }
//             else{
//                 k[i][w]=k[i-1][w]
//             }
            
//         }
        
//     }
//     return k[n][w]

// }


