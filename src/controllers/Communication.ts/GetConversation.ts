import { Request, Response } from "express";
import Message from "./Message";

class GetConversation {
  async handle(req: Request, res: Response) {
    const { userId, recipientId } = req.params;

    console.log("Buscando conversa entre:", userId, recipientId );

    try {
      /*let conversation = await Conversation.findOne({
        participants: { $all: [userId, recipientId] },
      }).populate("lastMessage");

      

      // Se não encontrar uma conversa, cria uma nova
      if (!conversation) {
        conversation = new Conversation({
          participants: [userId, recipientId],
          lastMessage: null,
        });
        await conversation.save();
      }

      const messages = await Message.find({
        conversation: conversation._id,
      }).sort({ timestamp: 1 });
      console.log(userId, recipientId )

      const con = await Conversation.findOne({
        participants: {$all: [userId, recipientId]}
      })

      if(!con){
        const newCon = await Conversation.create({
          participants: [userId, recipientId]
        })

        return res.status(200).json(newCon)
      }







      return res.status(200).json(con);*/
    } catch (error) {
      console.error("Erro ao recuperar conversa:", error);
      res.status(500).json({ error: "Erro ao recuperar conversa" });
    }
  }
}

export { GetConversation };
