import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class DisablePosition {
    async handle(req: Request, res: Response){
        try{
            

            const {id} = req.body

console.log(id)

            const contractor = await userModel.findOne({
                _id: req.userId
            })

            if(!contractor)
                return res.status(404).send({message: "Usuario não existe"})

            if(!contractor.isContractor)
                return res.status(404).send({message: "Usuário não é contratante"})

            const disablePosition= await positionModel.updateOne({
                _id: id
            },
            {
               isVisible: false 
            })
    
            return res.status(200).json(disablePosition)
        }catch(err){
            console.log(err)
        }
        
    }
}