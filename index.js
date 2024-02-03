const express = require("express")
const mongoose = require("mongoose")
require('dotenv').config()

const Users = require("./src/Models/Users")
const { register, login, findUser, updateUser } = require("./src/Controllers/Users")
const http = require("http");
const { Server } = require("socket.io")
const server = express()


const app = http.createServer(server)
const io = new Server(app)

const cors = require("cors")
const { verifyToken, validateForm, isValidated } = require("./src/Middlewares/Index")
const { addForm } = require("./src/Controllers/Form");
const { sendEmail } = require("./src/Helper/Email");
server.use(express.json())
server.use(cors())

server.get("/",(req,res)=>{

    res.status(200).json({
      uname:"Archie" , 
      uphone:"00000000"
      
    })
})

server.post("/register",register,sendEmail)
 server.post("/login",login)    
 server.post("/addForm",validateForm,isValidated,addForm);
// server.put("/update-user",verifyToken,updateUser)
 server.get("/get-product/:id",(req,res)=>{
  res.send(req.params.id)
 })

 server.get("/get-user",verifyToken,findUser)


io.on("connection",socket=>{
  console.log("new user connected");
  socket.on("message",message=>{
    console.log(message);
  })
})
const port = process.env.PORT
app.listen(port,()=>{
    console.log("Server Started")

    
})
const mongodb = process.env.MONGODB_URL
mongoose.connect("mongodb://singhbinita633:pYeJOOZXawpA7cDz@ac-4s41eqk-shard-00-00.i370czn.mongodb.net:27017,ac-4s41eqk-shard-00-01.i370czn.mongodb.net:27017,ac-4s41eqk-shard-00-02.i370czn.mongodb.net:27017/?ssl=true&replicaSet=atlas-167kby-shard-0&authSource=admin&retryWrites=true&w=majority")
.then (data=>console.log("Database Connected"))
.catch(error=>console.log("Error"))
