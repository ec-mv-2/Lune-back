import { Request, Response } from "express";
import { CoverLetter } from "../models/coverLetterModel";

interface CreateCoverLetterBody {
  userId: string;
  title: string;
  content: string;
}

export class CreateCoverLetter {
    async handle(req: Request, res: Response) {
      const { userId, title, content } = req.body;
  
      if (!userId || !title || !content) {
        return res.status(400).json({ message: "Todos os campos são obrigatórios." });
      }
  
      try {
        const letter = await CoverLetter.findOneAndUpdate(
          { userId },
          { title, content },
          { upsert: true, new: true }
        );
  
        return res.status(200).json(letter);
      } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Erro ao salvar a carta de apresentação." });
      }
    }
  }
