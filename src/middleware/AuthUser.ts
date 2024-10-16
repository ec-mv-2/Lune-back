import { NextFunction, Request, Response } from "express";
import { userModel } from "../controllers/models/UserModel";
import jwt from 'jsonwebtoken';
type jwtProps = {
    id: string
}
export default async function AuthUser(req: Request, res: Response, next: NextFunction){
    try{
        const { authorization } = req.headers;
        console.log(authorization)
        if (!authorization) {
            return res.status(500).send({ err: "Autorização inválida" });
        }
        const token = authorization.split(' ')[1];
        //console.log(process.env.JWT_TOKEN)
    
        const {id} = jwt.verify(token, String(process.env.JWT_TOKEN)) as jwtProps;
    
        const user = await userModel.findOne({_id: id})
    
        if (!user){
            return res.status(500).send({ err: "Usuário não existe no banco" });
        }

        req.userId = id;
        
        return next();
    } catch(err){
        console.log(err)
    }
}