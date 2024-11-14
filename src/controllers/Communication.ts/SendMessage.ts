import { Request, Response } from "express";
import Message from "./Message";
import Conversation from "./Conversation";

class SendMessage {
  async handle(req: Request, res: Response) {
    const { userId, recipientId, content } = req.body;

    try {
      let conversation = await Conversation.findOne({
        participants: { $all: [userId, recipientId] },
      });

      if (!conversation) {
        conversation = new Conversation({
          participants: [userId, recipientId],
          lastMessage: null,
        });
        await conversation.save();
      }

      const newMessage = new Message({
        conversation: conversation._id,
        sender: userId,
        content,
        timestamp: new Date(),
      });

      await newMessage.save();

      conversation.lastMessage = newMessage._id;
      await conversation.save();

      res.status(200).json({ message: "Mensagem enviada com sucesso", newMessage });
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  }
}

export { SendMessage };
