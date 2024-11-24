import { Request, Response } from "express";
import { helpModel } from "../models/HelpModel";

export class ListHelp {
    async handle(req: Request, res: Response){
        try{
            helpModel.find({}).then(function(users){
                res.json(users)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}