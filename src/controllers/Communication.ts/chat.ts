import { Request, Response } from "express";
import { userModel } from "../models/UserModel";
import { chatMOdel } from "./Conversation";
import bcryptjs from 'bcryptjs'

export class Chat {
    async handle(req: Request, res: Response){
        try{
            const {otherUserId} = req.body

            const userExists = await userModel.findOne({_id: otherUserId})

            const newChat = await chatMOdel.create({
                users: [req.userId, otherUserId],
                messages: []
            })
    
            res.status(200).json(newChat)
        }catch(err){
            console.log(err)
        }
        
    }
}