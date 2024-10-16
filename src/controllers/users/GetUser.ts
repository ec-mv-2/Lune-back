import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class GetUser {
    async handle(req: Request, res: Response){
        try{
            const {userId} = req.params
            const user = await userModel.findOne({_id: userId})

            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            return res.status(200).json(user)

        }catch(error){
            console.log(error)
        }
    }
}