import { Request, Response } from "express";
import Message from "./Message";
import Conversation from "./Conversation";

class SendMessage {
  
  async handle(req: Request, res: Response) {
    const { from, to, text } = req.body;

    if (!from || !to || !text) {
      return res.status(400).json({ error: "Campos 'from', 'to' e 'text' são obrigatórios." });
    }

    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [from, to] },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [from, to],
          lastMessageAt: new Date(),
        });
        await conversation.save();
      }

      const newMessage = new Message({
        conversation: conversation._id, 
        from,  
        to,
        text
      });
      await newMessage.save();

      conversation.lastMessage = newMessage._id;
      conversation.lastMessageAt = new Date();
      await conversation.save();

      res.status(200).json({ message: newMessage });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      res.status(500).json({ error: "Erro ao enviar a mensagem" });
    }
  }
}

export { SendMessage };
