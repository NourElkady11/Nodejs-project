// const validateFileUpload = (req, res, next) => {
//     let f=1
//     if (req.files.length == 0) {
//         return res.status(400).json({ message: 'You must upload your image' });
//     }
//     if(f==1){
//         for (let i = 0; i < req.files.length; i++) {
//             if(req.files[i].mimetype.split("/")[0]!="image"){
//                 return res.status(400).json({ message: 'files must be images only ya bro' });
//             }
            
//         }
//     }

//         next();
    
// };
// module.exports=validateFileUpload