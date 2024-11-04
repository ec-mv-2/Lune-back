import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";

export class ListJob{
    async handle (req: Request, res: Response){
        try{
            const {jobId} = req.params
            const job = await positionModel.findOne({_id: jobId})

            if(!job){
                    return res.status(404).send({message: "Vaga não encontrada"})
            }

            return res.status(200).json(job)

        } catch(error){
            console.log(error)
        }
    }
}