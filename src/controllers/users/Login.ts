import { Request, Response } from "express";
import { userModel } from "../models/UserModel";
import bcryptjs from 'bcryptjs'
import jwt from 'jsonwebtoken';

interface userProps{
    id: string,
    name: String,
    email: String,
    password: String,
    cep: String,
    state: String,
    cpf: String,
    birthDate: String   
}

export class Login{
    async handle(req: Request, res: Response){
        try{
            const {email, password} = req.body

            const userExists: userProps | null = await userModel.findOne({email})

            if(!userExists){
                return res.status(404).send({message: "Usuário não encontrado"})
            }

            const isValidPassword = await bcryptjs.compare(password, String(userExists.password));

            if(!isValidPassword){
                return res.status(404).send({message: "Email ou senha incorretos"})
            }

            const { id, name } = userExists;

            const token = jwt.sign(
                { id, name }, 
                String(process.env.JWT_TOKEN), 
                { expiresIn: '1d' }
            );
            return res.status(200).json({userExists, token})
        }catch(err){
            console.log(err)
        }
    }
}