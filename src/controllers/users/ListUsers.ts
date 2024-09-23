import { Request, Response } from "express";
import { userModel } from "./UserSchema";

export class ListUsers {
    async handle(req: Request, res: Response){
        try{
            userModel.find({}).then(function(users){
                res.json(users)
                console.log(users)
            }).catch(function(err){
                console.log(err)
            })
        } catch(err){
            
        }
    }
}