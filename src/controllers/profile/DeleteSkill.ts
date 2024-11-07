import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class DeleteSkill {
    async handle(req: Request, res: Response){
        try{
            const {nameSkill} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            user.skills.splice(user.skills.indexOf(nameSkill), 1);
            user.save()
            return res.status(200).json(nameSkill)
        }catch(error){
            console.log(error)
        }
    }
}