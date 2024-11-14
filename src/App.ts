import express from "express"
import mongoose from "mongoose"
import { router } from "./routes"
import cors from 'cors'
import { resolve } from 'path'
import http from "http"
import { Server } from "socket.io"

const app = express()
const server = http.createServer(app);


mongoose.connect('mongodb://127.0.0.1:27017/lune');

const io = new Server(server, {
    cors: {
        origin:"*",
        methods:["GET", "POST"]
    }
})

const socketToUserMap: { [key: string]: string } = {};




/*app.get("/getUsers", (req, res)=>{
    userModel.find({}).then(function(users){
        res.json(users)
        console.log(users)
    }).catch(function(err){
        console.log(err)
    })
})


app.post("/postUsers", async (request, response)=>{
    await userModel.create({
        name: "Ohana",
        age: 22
    })
})

app.put("/putUsers", async (req, res)=>{
    const user = await userModel.findById("66d8c3b84c50d1951470b844")
    if(user){
        user.name = "Camila"
        user.save()
    }
})

app.delete("/deleteUsers", async(req, res)=>{
    const user = await userModel.deleteOne({_id:"66d8c3b84c50d1951470b844"})
    
})*/
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(resolve('uploads')));
app.use(router);



export { app, server };