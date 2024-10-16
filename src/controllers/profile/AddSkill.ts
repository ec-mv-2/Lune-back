import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class AddSkill {
    async handle(req: Request, res: Response){
        try{
            const {nameSkill} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }
            user.skills.push(nameSkill)
            user.save()
            return res.status(200).json(nameSkill)
        }catch(error){
            console.log(error)
        }
    }
}