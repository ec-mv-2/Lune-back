import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class UpdatePosition {
    async handle(req: Request, res: Response){
        try{
            

            const {
                id,
                title,
                enterprise, 
                summary,
                salary, 
                skill,
                jobModel,
                location,
                startDate,
                endDate,
                degree,
                experience, isPrivate} = req.body

console.log(id, title,
    enterprise, 
    summary,
    salary, 
    skill,
    jobModel,
    location,
    startDate,
    endDate,
    degree,
    experience, isPrivate)

            const contractor = await userModel.findOne({
                _id: req.userId
            })

            if(!contractor)
                return res.status(404).send({message: "Usuario não existe"})

            if(!contractor.isContractor)
                return res.status(404).send({message: "Usuário não é contratante"})

            const updatePosition= await positionModel.updateOne({
                _id: id
            },
            {
                title,
                enterprise, 
                summary,
                salary, 
                skill,
                jobModel,
                location,
                startDate,
                endDate,
                degree,
                experience, isPrivate
            })
    
            return res.status(200).json(updatePosition)
        }catch(err){
            console.log(err)
        }
        
    }
}