import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";

export class ListPositionByUser {
    async handle(req: Request, res: Response){
        try{
            const {userId} = req.params
            positionModel.find({contractorId: userId}).then(function(position){
                res.json(position)
                console.log(position)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}