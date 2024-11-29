import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class CreatePosition {
    async handle(req: Request, res: Response){
        try{
            
            const {title, 
                enterprise, 
                summary,
                salary, 
                skill,
                jobModel,
                 location,
                 startDate,
                 endDate,
                 degree,
                 experience, 
                 isPrivate
            } = req.body

            const contractor = await userModel.findOne({
                _id: req.userId
            })

            if(!contractor)
                return res.status(404).send({message: "Usuario não existe"})

            if(!contractor.isContractor)
                return res.status(404).send({message: "Usuário não é contratante"})
            


     
            const newPosition= await positionModel.create({
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
                experience,
                isPrivate,
                candidates: [],
                contractorId: req.userId,
                createdAt: new Date(),
                isVisible: true
            })
    
            res.status(200).json(newPosition)
        }catch(err){
            console.log(err)
        }
        
    }
}