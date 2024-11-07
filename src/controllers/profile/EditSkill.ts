import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class EditSkill {
    async handle(req: Request, res: Response){
        try{
            const {oldNameSkill, newNameSkill} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            const skill = user.skills.indexOf(oldNameSkill)
            user.skills[skill] = newNameSkill
            user.save()
            return res.status(200).json(newNameSkill)
        }catch(error){
            console.log(error)
        }
    }
}