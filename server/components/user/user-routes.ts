import { Router } from "express";
import userController from "./user-controller";

const userRouter = Router();
const{createUser, loginUser} = userController;

userRouter.post('/signup', createUser)
userRouter.post('/login', loginUser)

const api = {
    path: '/api/users',
    router: userRouter
}

export default api;