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
            return await User.findByIdAndUpdate(userId, {$set: {profile}}, {new:true})
        } catch (err) {
            throw err;
        }
    },
    async getUser(userId:any){
        try {
            return await User.findById(userId)
        } catch (err) {
            throw err;
        }
    },
    async makeAdmin (userId:any){
        try {
            return await User.findByIdAndUpdate(userId, {$set: {isAdmin: true}}, {new: true});
        } catch (err) {
            throw err;
        }
    },
    async getUsers(options:any){
        const{page, limit} = options;
        const offset = (page*limit)-limit;
        try{
            return await User.find({}, {password: 0})
            .skip(offset)
            .limit(limit)
        }catch(err){
            throw err;
        }
    },
    async userCount(){
        try{
            return  await User.countDocuments();
        }catch(err){
            throw err;
        }
    },
    async disAdmin(userId:string){
        try{
            return await User.findByIdAndUpdate(userId, {$set: {isAdmin: false}}, {new:true});
        }catch(err){
            throw err;
        }
    },

}
export default userService;