import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class AddExperience {
    async handle(req: Request, res: Response){
        try{
            const {nameExperience, start, termination, company, activities} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }
            user.experience.push({
                name: nameExperience,
                start: start,
                termination: termination,
                company: company,
                activities: activities
            })
            user.save()
            return res.status(200).json(nameExperience)
        }catch(error){
            console.log(error)
        }
    }
}