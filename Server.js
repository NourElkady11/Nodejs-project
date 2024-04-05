// const file=require("node:fs");
// const path=require("node:path");
const express = require('express');
const app = express();
const productsrouter=require("./routes/products-routes");
const usersRouter=require("./routes/user-routes")
const mongoos=require("mongoose");
const cors=require("cors");
const { Server }=require("socket.io");
const { createServer } = require('node:http');
const path = require("node:path");
const bodyParser = require('body-parser');

require("dotenv").config();

const newurl=process.env.DatabaseConnection;
mongoos.connect(newurl).then(()=>console.log("DB-CONNECTED")).catch((err)=>console.log(err));
app.listen(process.env.port,()=>{
    console.log("Server is running");
});  
// const myserver=createServer(app);
// const io=new Server(myserver);

// myserver.listen(4000,()=>{
//       console.log("server is running");
// })
// app.get("/chat",(req,res)=>{
//     res.sendFile(path.join(__dirname,"./views/chat.html"))
// })

// io.on('connection', (user) => {
//     console.log('a user connected');
//     user.on('disconnect', () => {
//       console.log('user disconnected');
//     });


//     user.on("chat message",(msg)=>{
//         console.log(msg);
//         io.emit('send_message',[msg,user.id])
//     })

//     user.on('typing',()=>{
//         user.broadcast.emit("show_typing")
//     })
//     user.on('stop_typing',()=>{
//         user.broadcast.emit("stop")
//     })
//   });
  




// app.use(cors());
// app.use(bodyParser.json());
app.use(express.json()); 
app.use("/api",productsrouter);
app.use("/users",usersRouter)
app.all("*",(req,res)=>{
    res.status(404).json({"message":"Not Found"})
    //in case wrong routeee
})  
// const eventcreator=require("node:events");
// const { type } = require("node:os");
// const http=require("node:http");
// const serve=http.createServer((req,res)=>{
//     res.writeHead(200,{"content-type":"text/html"});
//     res.end(req.url)
// })
// serve.listen(5000,()=>{
//     console.log("server is running noww yab4a 3al port bt3ak");
// })
// file.writeFileSync("./text","ana atcreate ya ged3an");
// const x=file.readFileSync("./text","utf-8",(err,data)=>{
    // if(err){
    //     console.log(err);
    // }
    // else{
    //     console.log(data);
    // }
// });
// const event=new eventcreator();
// event.on("register",(name)=>{
//     console.log("welcome "+name);
// })
// event.emit("register"," kady");




