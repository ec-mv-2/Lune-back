import { Request, Response } from "express";
import { CoverLetter } from "../models/coverLetterModel";

interface GetCoverLetterParams {
  userId: string;
}

export class GetCoverLetter {
  async handle(req: Request<GetCoverLetterParams>, res: Response): Promise<Response> {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ message: "ID do usuário é obrigatório." });
    }

    try {
      const letter = await CoverLetter.findOne({ userId }).exec();

      if (!letter) {
        return res.status(404).json({ message: "Carta de apresentação não encontrada." });
      }

      return res.status(200).json(letter);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Erro ao buscar a carta de apresentação." });
    }
  }
}
