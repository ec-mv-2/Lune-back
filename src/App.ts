import express from "express"
import mongoose from "mongoose"
import { router } from "./routes"
import cors from 'cors'
import { resolve } from 'path'
import http from "http"
import { Server } from "socket.io"
import Message from "./controllers/Communication.ts/Message"

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
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(express.static(resolve('uploads')))
app.use(router)

io.on("connection", (socket) => {
    console.log("Novo cliente conectado:", socket.id);
  
    socket.on("authenticate", async (userId: string) => {
      socketToUserMap[socket.id] = userId;
      console.log(`Usuário ${userId} autenticado com socketId ${socket.id}`);
  
      // Envia o histórico de mensagens ao usuário ao conectar
      const messages = await Message.find({
        $or: [{ from: userId }, { to: userId }],
      }).sort({ timestamp: 1 });
  
      socket.emit("messageHistory", messages);
    });
  
    socket.on("message", async (data) => {
      console.log(`Mensagem de ${data.from} para ${data.to}: ${data.message}`);
  
      const recipientSocketId = Object.keys(socketToUserMap).find(
        (socketId) => socketToUserMap[socketId] === data.to
      );
  
      // Salva a mensagem no banco de dados
      const newMessage = await Message.create({
        conversation: data.conversationId,
        from: data.from,
        to: data.to,
        text: data.message,
        timestamp: new Date(),
      });
  
      // Envia a mensagem para o destinatário se ele estiver online
      if (recipientSocketId) {
        io.to(recipientSocketId).emit("receiveMessage", {
          from: data.from,
          message: data.message,
        });
      } else {
        console.log(`Destinatário ${data.to} não encontrado.`);
      }
    });
  
    socket.on("disconnect", (reason) => {
      console.log(`Usuário desconectado: ${socket.id}, motivo: ${reason}`);
      delete socketToUserMap[socket.id];
    });
  });
  
  export { app, server };