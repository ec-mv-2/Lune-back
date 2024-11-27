import { Request, Response } from "express";
import { userModel } from "../models/UserModel";
import Message from "../Communication.ts/Message";

export class DeleteUser{
    async handle(req: Request, res: Response){
        const user = await userModel.findOne({
            _id: req.userId
        })
        if(!user){
            return res.status(400).send({Message:"Usuário não encontrado"})
        } 
    await userModel.deleteOne({_id:req.userId})    
    return res.status(200).json(user)}
}