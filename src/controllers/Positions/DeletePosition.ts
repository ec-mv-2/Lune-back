import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class DeletePosition {
    async handle(req: Request, res: Response){
        try{
            
            const {title} = req.params

            console.log(title)
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


            const deletePosition= await positionModel.deleteOne({
                title: title
            })
    
            res.status(200).json(deletePosition)
        }catch(err){
            console.log(err)
        }
        
    }
}