import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import dotenv from "dotenv";
dotenv.config();

export const isLoggedIn = (req:Request, res:Response, next:NextFunction) =>{
    let token:any = req.headers['authorization'] || req.headers['x-access-token'] //&& req.headers['authorization'].replace(/"/g, '').substring(7);
    const SECRET_KEY:any = process.env.SECRET_KEY;

    if(token && token.startsWith('Bearer'))
        token = token.slice(7); //.replace(/"/g, '').substring(7);
    if(!token) return res.status(401 ).send({message: "You do not have the authorization to access this resource"});
    
    jwt.verify(token, SECRET_KEY, (err:any)=>{
        if(err) {
            return res.status(401).send({message: err.message})
        }
    
        next();
    });
}
export const isAdmin = (req:Request, res:Response, next:NextFunction) => {
    let token:any = req.headers['authorization'] || req.headers['x-access-token'] //&& req.headers['authorization'].replace(/"/g, '').substring(7);
    
    if(token && token.startsWith('Bearer')){
        token = token.slice(7);  //token.replace(/"/g, '').substring(7);
    }
    if(!token) return res.status(401 ).send({message: "You do not have the authorization to access this resource"});
    const decoded:any = jwt.decode(token);
    const {currentUser} = decoded;

    if(!currentUser.isAdmin)
        return res.status(401).send({message: "You do not have the authorization to access this resource"})
    next();
}