// controllers/chat/SendMessage.ts
import { Request, Response } from "express";
import Message from "./Message";
import Conversation from "./Conversation";

class SendMessage {
  async handle(req: Request, res: Response) {
    const { from, to, text } = req.body;

    try {
      const newMessage = new Message({ from, to, text });
      await newMessage.save();

      let conversation = await Conversation.findOne({
        participants: { $all: [from, to] },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [from, to],
          lastMessage: newMessage._id,
          lastMessageAt: new Date(),
        });
      } else {
        conversation.lastMessage = newMessage._id;
        conversation.lastMessageAt = new Date();
      }

      await conversation.save();

      return res.status(200).json({ message: newMessage });
    } catch (error) {
      console.error("Error sending message:", error);
      return res.status(500).json({ error: "Erro ao enviar a mensagem" });
    }
  }
}

export { SendMessage };
