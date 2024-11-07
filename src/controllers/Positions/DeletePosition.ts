import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class DeletePosition {
    async handle(req: Request, res: Response){
        try{
            
            const {id} = req.params

            console.log(id)
            const contractor = await userModel.findOne({
                _id: req.userId
            })

            if(!contractor)
                return res.status(404).send({message: "Usuario não existe"})

            if(!contractor.isContractor)
                return res.status(404).send({message: "Usuário não é contratante"})
            

            const position = await positionModel.findOne({
                _id:id
            })

            if(!position)
                return res.status(404).send({message: "Vaga não existe"})


            const deletePosition= await positionModel.deleteOne({
                _id: id
            })
    
            res.status(200).json(deletePosition)
        }catch(err){
            console.log(err)
        }
        
    }
}