import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class UpdatePosition {
    async handle(req: Request, res: Response){
        try{
            

            const {
                title,
                newTitle, 
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

            const contractor = await userModel.findOne({
                _id: req.userId
            })

            if(!contractor)
                return res.status(404).send({message: "Usuario não existe"})

            if(!contractor.isContractor)
                return res.status(404).send({message: "Usuário não é contratante"})
            

            const position = await positionModel.findOne({
                title: title
            })

            if(!position)
                return res.status(404).send({message: "Vaga não existe"})


            const updatePosition= await positionModel.updateOne({
                title: title
            },
            {
                title: newTitle, 
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
            })
    
            res.status(200).json(updatePosition)
        }catch(err){
            console.log(err)
        }
        
    }
}