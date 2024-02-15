const multer=require("multer");
const mystorege=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"images")
        //first paramter if an error exist 
        //secound paramer the destination folder(uploads)

    },
    filename:(req,file,cb)=>{
        // file={
        //     "fileldname":"profile"
        //     "originalname":cat.png":
        //     "encoding":"7bit"
        //     "mimtype":"image/png"
        // }

        const name=Math.floor(Math.random()*1E9/2+5);
        cb(null,name+"."+file.mimetype.split("/")[1])
    }, 
    
    
})
const upload=multer({
    storage:mystorege,
//     fileFilter:(req,file,cb)=>{
//         let f=1
//         //file filter decide accepting the file ot not
//         console.log(file);
//        const filter=file.mimetype.split("/")[0]
//        if(filter=="image"){f=1}
//        else{f=0}
//        if(f==1){
//         cb(null,true)
//        }
//        else{
//         cb(new Error("files must be images only ya bro"),false)
//        }

//     }
})
//el file atany 3ashan pdf mara74 eldatabase bas 

module.exports=upload