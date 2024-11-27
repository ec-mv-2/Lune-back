import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class BanInfo{
    async handle(req: Request, res: Response){
        try{
            const {jobId} = req.params

            const job = await positionModel.findOne({
                _id: jobId
            })
            if(!job){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            const userCheckAdm = await userModel.findOne({
                _id: req.userId
            })

            if(userCheckAdm){
                if(!userCheckAdm.isADM){
                    return res.status(404).send({message: "Sem autorização"})
                }
            }

            await positionModel.deleteOne({_id: jobId}) 

            return res.status(200).json(job)

        }catch(err){
            console.log(err)
        }
    }
}