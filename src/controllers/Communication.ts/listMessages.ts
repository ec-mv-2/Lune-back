import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";
import { chatMOdel } from "./Conversation";

export class ListMessages{
    async handle (req: Request, res: Response){
        try{
            const {otherUserId} = req.body
            const chat = await chatMOdel.findOne({users: [req.userId, otherUserId]})

            const user = await userModel.findOne({_id: otherUserId})
            if(!chat){

                const chatTeste = await chatMOdel.findOne({users: [otherUserId, req.userId]})
                if(!chatTeste){
                    return res.status(404).send({message: "Vaga não encontrada"})
                }

                return res.status(200).json({chatTeste, user})
            }

            return res.status(200).json({chat, user})

        } catch(error){
            console.log(error)
        }
    }
}