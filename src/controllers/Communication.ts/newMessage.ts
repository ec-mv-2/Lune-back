import { Request, Response } from "express";
import { userModel } from "../models/UserModel";
import { chatMOdel } from "./Conversation";
import bcryptjs from 'bcryptjs'

export class NewMessage {
    async handle(req: Request, res: Response){
        try{
            const {message, otherUserId} = req.body

            const chat = await chatMOdel.findOne({users: [req.userId, otherUserId]})

            if(!chat){
                const chatTeste = await chatMOdel.findOne({users: [otherUserId, req.userId]})

                if(chatTeste && message){
                    chatTeste.messages.push({
                        user: req.userId,
                        message,
                    })
                    chatTeste.save()
                }
            }

            if(chat && message){
                chat.messages.push({
                    user: req.userId,
                    message,
                })
                chat.save()

                return res.status(200).json(message)
            }
    
            return res.status(400)
        }catch(err){
            console.log(err)
        }
        
    }
}