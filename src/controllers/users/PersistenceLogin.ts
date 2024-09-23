import { Request, Response } from "express";
import { userModel } from "./UserSchema";

export class PersistenceLogin{
    async handle(req: Request, res: Response){
        try{
            console.log(req.userId)
            const user = await userModel.findOne({
                _id: req.userId
            })

            return res.status(200).json(user);
        }catch(err){
            console.log(err)
        }
    }
}