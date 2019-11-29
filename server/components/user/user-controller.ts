import { Request, Response, NextFunction } from "express";
import userService from "./user-service";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const{create, usernameExist, emailExist, getUsers, userCount, makeAdmin, disAdmin} = userService;
const SECRET_KEY:any = process.env.SECRET_KEY;

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
                    email: user.email,
                    profile: user.profile,
                    isAdmin: user.isAdmin
                }},
                SECRET_KEY,
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
                    email: user.email,
                    profile: user.profile,
                    isAdmin: user.isAdmin
                }},
                SECRET_KEY,
                {expiresIn: '24h'} ) 
            return res.status(200).send({status: 'success', token})
        }catch(err){
            res.status(400).send(err);
        }
    },
    verifyToken(req:Request, res:Response){
        const{token} = req.params;
        jwt.verify(token, SECRET_KEY,  (err:any) => {
            if(err ) return res.status(401).send({isAuthenticated: false})
        res.status(200).send({isAuthenticated: true})
        })
    },
    async usernamExist(req:Request, res:Response, next:NextFunction){
        const{username} = req.body;
        try{
            const isUsername = await usernameExist(username);
            if(isUsername)
                return res.status(400).send({status: 'error', message: 'This username is taken'})
                
            next();
        }catch(err){
            throw err
        }
    },
    async emailExist(req:Request, res:Response, next:NextFunction){
        const{email} = req.body;
        try{
            const isEmail = await emailExist(email);
            if(isEmail)
                return res.status(400).send({status: 'error', message: 'This email is taken'})
                
            next();
        }catch(err){
            throw err
        }
    },
    async getUsers(req:Request, res:Response){
        const page = Number(req.query.page) || 1;
        const limit = Number(req.query.limit) || 20;

        try{
            const users = await getUsers({page, limit});
            const count = await userCount();

            return res.status(200).send({
                users,
                page,
                pages: Math.ceil(count/limit),
                total: users.length
            })
        }catch(err){
            res.status(400).send(err);
        }
    },
    async makeAdmin(req:Request, res:Response){
        const {userId} = req.params;
        try {
            const user = await makeAdmin(userId);
            if(user)
                return res.status(200).send({user})
            return res.status(400).send({message: "user does not exist"})
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async disAdmin(req:Request, res:Response){
        const {userId} = req.params;
        try {
            const user = await disAdmin(userId);
            if(user)
                return res.status(200).send({user})
            return res.status(400).send({message: "user does not exist"})
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default userController;