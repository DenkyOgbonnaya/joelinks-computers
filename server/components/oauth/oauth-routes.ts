import { Router } from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const SECRET_KEY:any = process.env.SECRET_KEY;


const oauthRouter = Router();

oauthRouter.get('/auth/google', passport.authenticate('google', {
    session: false,
    scope: ['profile', 'email']
}))

oauthRouter.get('/auth/google/redirect', passport.authenticate('google', {session: false}), (req:any, res:any) => {
    jwt.sign(
        {currentUser: req.user},
        SECRET_KEY, 
        {expiresIn:'24hrs'}, (err, token) => {
        if(err){
            console.log(err);
            
            res.sendStatus(500);
        } else {
            res.redirect(`https://joelinks-computers.herokuapp.com/?token=${token}`)
        }
    });
})

const api = {
    path: "/api",
    router: oauthRouter
}
export default api;