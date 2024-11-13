import { Request, Response } from "express";
import Message from "./Message";
import Conversation from "./Conversation";

class GetConversation {
  async handle(req: Request, res: Response) {
    const { user1, user2 } = req.params;

    try {
      const conversation = await Conversation.findOne({
        participants: { $all: [user1, user2] },
      }).populate("lastMessage");

      if (!conversation) {
        return res.status(404).json({ error: "Conversa não encontrada" });
      }

      const messages = await Message.find({
        conversation: conversation._id,
      }).sort({ timestamp: 1 });

      res.status(200).json({ conversation, messages });
    } catch (error) {
      console.error("Error retrieving conversation:", error);
      res.status(500).json({ error: "Erro ao recuperar conversa" });
    }
  }
}

export { GetConversation };
