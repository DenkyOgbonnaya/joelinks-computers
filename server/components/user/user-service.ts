import User from "./users-model";
import { ENGINE_METHOD_DIGESTS } from "constants";

type user = {
    username: string,
    email: string,
    password: string
}
const userService = {
    //create user
    async create(user:user){
        try{
            return await User.create(user);
        }catch(err){
            throw err;
        }
    },
    async usernameExist(username:string){
        try{
            return await User.findOne({username});
        }catch(err){
            throw err;
        }
    },
    async emailExist(email:string){
        try{
            return await User.findOne({email});
        }catch(err){
            throw err;
        }
    },
    async edit(userId:any, profile:any){
        try {
            return await User.findByIdAndUpdate(userId, {$set: {profile}})
        } catch (err) {
            throw err;
        }
    }

}
export default userService;