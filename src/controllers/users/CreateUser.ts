import { Request, Response } from "express";
import { userModel } from "../models/UserModel";

import bcryptjs from 'bcryptjs'

export class CreateUser {
    async handle(req: Request, res: Response){
        try{
            const {name, email, password, cep, state, cpf, birthDate, isContractor, isADM} = req.body

            const userExists = await userModel.findOne({email})

            if(userExists){
                return res.status(409).send({message: "Já existe uma conta com este email cadasatrada!"})
            }

            const password_hash = bcryptjs.hashSync(password, 8);

            const newUser = await userModel.create({
                name,
                email,
                password: password_hash,
                cpf,
                cep,
                birthDate,
                state,
                bio: "",
                position: "",
                skills: [],
                experience: [],
                academic: [],
                isContractor,
                isADM,
                createdAt: new Date()
            })
    
            res.status(200).json(newUser)
        }catch(err){
            console.log(err)
        }
        
    }
}