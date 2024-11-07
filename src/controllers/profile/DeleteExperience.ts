import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class DeleteExperience {
    async handle(req: Request, res: Response){
        try{
            const {expIndex} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }
            console.log(expIndex+1)
            user.experience.splice(expIndex+1, 1);
            user.save()
            return res.status(200).json(user.experience[expIndex-1])
        }catch(error){
            console.log(error)
        }
    }
}