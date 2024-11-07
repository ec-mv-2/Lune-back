import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";

export class ListPositionByUser {
    async handle(req: Request, res: Response){
        try{
            positionModel.find({contractorId: req.userId}).then(function(position){
                res.json(position)
                console.log(position)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}