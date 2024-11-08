// controllers/chat/GetConversation.ts
import { Request, Response } from "express";
import Message from "./Message";
import Conversation from "./Conversation";

class GetConversation {
  async handle(req: Request, res: Response) {
    const { user1, user2 } = req.params;

    try {
      // Verificar se existe uma conversa entre os dois usuários
      const conversation = await Conversation.findOne({
        participants: { $all: [user1, user2] },
      }).populate("lastMessage");

      if (!conversation) {
        return res.status(404).json({ error: "Conversa não encontrada" });
      }

      // Buscar todas as mensagens entre os dois usuários
      const messages = await Message.find({
        from: { $in: [user1, user2] },
        to: { $in: [user1, user2] },
      }).sort({ timestamp: 1 });

      return res.status(200).json({ conversation, messages });
    } catch (error) {
      console.error("Error retrieving conversation:", error);
      return res.status(500).json({ error: "Erro ao recuperar conversa" });
    }
  }
}

export { GetConversation };
