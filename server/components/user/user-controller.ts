import { Request, Response } from "express";
import userService from "./user-service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const{create, usernameExist} = userService;
const{SECRET_KEY} = process.env;

const userController = {
    async createUser(req:Request, res:Response){
        try{
            const{username, email, password} = req.body;
            const hashedPassword = bcrypt.hashSync(password, 8);
        
            const user = await create({
                username,
                email,
                password: hashedPassword
            }); 
            //generate a token 
            const token = jwt.sign(
                {currentUser: {
                    _id: user._id, 
                    username: user.username, 
                    email: user.email}},
                "SECRET_KEY",
                {expiresIn: '24h'} ) 
                
            return res.status(201).send({
                status: 'success',
                token
            })
        }catch(err){
            res.status(500).send(err)
        }
    },
    async loginUser(req:Request, res:Response){
        const{username, password} = req.body;
        try{
            const user = await usernameExist(username);
            if(!user)
                return res.status(401).send({
                status: 'error',
                message: 'incorrect email and password combination!'})
            
            const validPassword = bcrypt.compareSync(password, user.password);

            if(!validPassword)
                return res.status(401).send({
                    status: 'error',
                    message: 'incorrect email and password combination'
                })
            //generate token
            const token = jwt.sign(
                {currentUser: {
                    _id: user._id, 
                    username: user.username, 
                    email: user.email}},
                "SECRET_KEY",
                {expiresIn: '24h'} ) 
            return res.status(200).send({status: 'success', token})
        }catch(err){
            console.log(err)
            res.status(400).send(err);
        }
    },
}

export default userController;