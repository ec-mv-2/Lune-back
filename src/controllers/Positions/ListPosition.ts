import { Request, Response } from "express";
import { positionModel } from "../models/PositionModel";

export class ListPosition {
    async handle(req: Request, res: Response){
        try{
            positionModel.find({}).then(function(position){
                res.json(position)
                console.log(position)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}