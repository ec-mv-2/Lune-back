import { Request, Response } from "express";
import { helpModel } from "../models/HelpModel";

export class SendHelp {
    async handle (req: Request, res: Response){
        try{
            const {name, question}= req.body
            console.log(name)

            const newQuestion = await helpModel.create({name,question})

            return res.status(200).json(newQuestion)


        }catch(error){
            console.log(error)
        }
    }
}
