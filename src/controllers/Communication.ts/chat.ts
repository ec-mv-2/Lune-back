import express from "express";
import http from "http";
import { Server } from "socket.io";
import { Request, Response } from "express";
import { userModel } from "../models/UserModel";
import { chatMOdel } from "./Conversation";
import bcryptjs from "bcryptjs";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

export class Chat {
  async handle(req: Request, res: Response) {
    try {
      const { otherUserId } = req.body;

      const userExists = await userModel.findOne({ _id: otherUserId });
      if (!userExists) {
        return res.status(404).json({ message: "User not found" });
      }

      const newChat = await chatMOdel.create({
        
        users: [req.userId, otherUserId],
        messages: [],
      })
      console.log("criou");

      res.status(200).json(newChat);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "An error occurred" });
    }
  }
}

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  
  socket.on("joinChat", (chatId) => {
    socket.join(chatId);
    console.log(`User joined chat: ${chatId}`);
  });

  socket.on("sendMessage", async ({ chatId, senderId, message }) => {
    try {
      const chat = await chatMOdel.findById(chatId);
      if (!chat) {
        return socket.emit("error", { message: "Chat not found" });
      }

      const newMessage = { sender: senderId, text: message, createdAt: new Date() };
      chat.messages.push(newMessage);
      await chat.save();

      io.to(chatId).emit("receiveMessage", newMessage);
    } catch (err) {
      console.error(err);
      socket.emit("error", { message: "Failed to send message" });
    }
  });

  

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

