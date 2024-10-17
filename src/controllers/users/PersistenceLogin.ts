import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class PersistenceLogin{
    async handle(req: Request, res: Response){
        try{
            const user = await userModel.findOne({
                _id: req.userId
            })

            return res.status(200).json(user);
        }catch(err){
            console.log(err)
        }
    }
}