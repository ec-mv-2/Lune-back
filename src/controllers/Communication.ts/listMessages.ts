import { Request, Response } from "express";
import { chatMOdel } from "./Conversation";  // Certifique-se de que está importando corretamente
import { userModel } from "../models/UserModel";

export class ListMessages {
  async handle(req: Request, res: Response) {
    try {
      const { otherUserId } = req.body;

      // Buscar o chat entre os dois usuários
      const chat = await chatMOdel.findOne({
        users: { $all: [req.userId, otherUserId] }
      });

      // Se o chat não for encontrado
      if (!chat) {
        // Verifica se há outro chat onde a ordem dos usuários está invertida
        const chatTeste = await chatMOdel.findOne({
          users: { $all: [otherUserId, req.userId] }
        });

        // Se não encontrar o chat
        if (!chatTeste) {
          console.log("n tem chat normal ")
          return res.status(404).send({ message: "Chat não encontrado" });
        }

        // Caso encontre um chat invertido
        const user = await userModel.findOne({ _id: otherUserId });
        
        return res.status(200).json({ chatTeste, user });
      }

      // Se o chat foi encontrado
      const user = await userModel.findOne({ _id: otherUserId });
      return res.status(200).json({ chat, user });

    } catch (error) {
      console.error(error);
      return res.status(500).send({ message: "Erro interno do servidor" });
    }
  }
}
