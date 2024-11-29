import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

export class BanUser{
    async handle(req: Request, res: Response){
        try{
            const {userId} = req.params

            const user = await userModel.findOne({
                _id: userId
            })
            if(!user){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            const userCheckAdm = await userModel.findOne({
                _id: req.userId
            })

            if(userCheckAdm){
                if(!userCheckAdm.isADM){
                    return res.status(404).send({message: "Sem autorização"})
                }
            }

            

            await userModel.deleteOne({_id: userId}) 

            return res.status(200).json(user)

        }catch(err){
            console.log(err)
        }
    }
}