import passport from "passport";
import {Strategy} from "passport-google-oauth20";
import { User } from "../../components/user";
require('dotenv').config();

const passportSetup = () => {
    const CLIENT_SECRET:any = process.env.CLIENT_SECRET;
    const CLIENT_ID:any = process.env.CLIENT_ID;
    
    passport.use('google',new Strategy({
        clientID: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        callbackURL: '/api/auth/google/redirect'
    }, async (AccessToken:any, refreshToken:any, profile:any, done:any) => {
    
        const user = await User.findOne({oauthId:profile.id});
        if(!user){
            const newUser = await User.create({
                username: profile.name.givenName,
                email: profile.emails[0].value,
                oauthId: profile.id
            })
            done(null, newUser);
        }else{
            done(null, user);
        }
    } ))
}

export default passportSetup;