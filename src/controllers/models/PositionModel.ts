import mongoose from "mongoose";
import { userModel } from "./UserModel";

const { Schema, model } = mongoose;

const positionSchema = new Schema({
    title: String, 
    enterprise: String, 
    summary: String,
    salary: Number, 
    skill: String,
    jobModel: String,
    location: String,
    startDate: String,
    endDate: String,
    degree: String,
    experience: Number,
    isPrivate: Boolean
})

export const positionModel = model("positions", positionSchema)

export class AddCandidato{
    async handle(req: Request, res: Response){
        try{
            const{job} = req.body
            const job=  await positionModel.findOne({
                _id: req.userId
            })
            if(!job){
                return res.status(404).send({message:"Vaga não encontrada!"})
            }
            job.candidato.push(job)
            job.save()
            return res.status(200).json(job)
        }catch(error){
            console.log(error)
        }
    }
}