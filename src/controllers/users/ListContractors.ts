import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class ListContractors {
    async handle(req: Request, res: Response){
        try{
            userModel.find({isContractor: true}).then(function(users){
                res.json(users)
                console.log(users)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}