import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class AddAcademic {
    async handle(req: Request, res: Response){
        try{
            const {course, start, termination, college, education} = req.body
            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }
            user.academic.push({
                course,
                start,
                termination,
                college,
                education
            })
            user.save()
            return res.status(200).json(course)
        }catch(error){
            console.log(error)
        }
    }
}