import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class UpdateUser{
    async handle(req: Request, res: Response){
        try{
            const {name, bio} = req.body

            const user = await userModel.findOne({
                _id: req.userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }
            if(name){
                user.name = name
            }
            if(bio){
                user.bio = bio
            }

            user.save()

            return res.status(200).json({name, bio})


        }catch(err){
            console.log(err)
        }
    }
}