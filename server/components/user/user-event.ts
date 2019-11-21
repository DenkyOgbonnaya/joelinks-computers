import eventEmitter from "events";
import userService from "./user-service";

const userEvent = new eventEmitter();

userEvent.on("addProfile", async(userId, profile)=>{
    try {
        await userService.edit(userId, profile)
    } catch (err) {
        throw err;
    }
})

export default userEvent;