import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class UpdateUser{
    async handle(req: Request, res: Response){
        try{
            const {name, bio, email, password, cep, birthDate, state} = req.body

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
            if(email){
                user.email = email
            }
            if(password){
                user.password = password
            }
            if(cep){
                user.cep = cep
            }
            if(birthDate){
                user.birthDate = birthDate
            }
            if(state){
                user.state = state
            }
            

            user.save()

            return res.status(200).json({name, bio})


        }catch(err){
            console.log(err)
        }
    }
}