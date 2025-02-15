const {validationResult}=require("express-validator");
const pmodel=require("../models/products.js");
const HTTP=require("../Response.js");
const runningServer=()=>{
    console.log("server is running");
};

const Getalldata=async (req,res)=>{
    try{
        // pagination
        const limit=req.query.limit || 10;
        const page=req.query.page || 1;
        const skip=(page -1 )*limit
        const get = await pmodel.find({})/* .limit(limit).skip(skip)*/

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
        const id=req.params.id
        const get = await pmodel.find({
            _id: id
        }).select({"_id":0})

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
        // const imgs=[]
        // const images=req.files
        // for(i=0;i<images.length;i++){
            //     imgs.push(images[i].filename)
            // } 
            // console.log(imgs);
            
            //a5er 5atwaaaa wnta bat7ot sora fel databasee
        const newproduct=req.body;
        const document=await pmodel.create({
            tittle:newproduct.tittle,
            price:newproduct.price,
            status:newproduct.status,
            // images:imgs
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
const updateOneProduct = async (req,res)=>{
    const id=req.params.id
    const value=req.body
try{
    const update= await pmodel.updateOne(
        {_id:id},
        // {
        //   value
        // }
        {
            _id:value._id,
            tittle:value.tittle,
            price:value.price,
            status:value.status,
        }
        
        //?set m4 lazem f mongoose 
    ) 
    if(update.length==0){
        res.status(404).json({
            "status":HTTP.FAIL,
            "data":[update],
        })
    }
    else{
        console.log(update);
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

const updateManyProduct = async (req,res)=>{
      const tittle=req.params.tittle
        const value=req.body
    try{
        const update= await pmodel.updateMany(
            {tittle:tittle},
            { $set: value }

            //?set m4 lazem f mongoose 
        ) 
        if(update.length==0){
            res.status(404).json({
                "status":HTTP.FAIL,
                "data":[update],
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



const DeleteOneProd= async(req,res)=>{
    try{
        const id=req.params.id
        const del=await pmodel.deleteMany({_id:id})
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
const DeleteManyProd= async(req,res)=>{
    try{
        const tittle=req.params.tittle
        const del=await pmodel.deleteMany({tittle:tittle})
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
    updateManyProduct,
    DeleteManyProd,
    DeleteOneProd,
    Getalldata,
    updateOneProduct
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


