import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class DeleteAcademic {
    async handle(req: Request, res: Response){
        try{
            const {academicIndex} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            user.academic.splice(academicIndex+1, 1);
            user.save()
            return res.status(200).json(user.academic[academicIndex])
        }catch(error){
            console.log(error)
        }
    }
}