import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";
import { userModel } from "../models/UserModel";

export class ListJob{
    async handle (req: Request, res: Response){
        try{
            const {jobId} = req.params
            const job = await positionModel.findOne({_id: jobId})

            if(!job){
                return res.status(404).send({message: "Vaga não encontrada"})
            }

            const contractor = await userModel.findOne({_id: job.contractorId})

            if(!contractor){
                return res.status(404).send({message: "Vaga não encontrada"})
            }

            return res.status(200).json({job, contractor})

        } catch(error){
            console.log(error)
        }
    }
}