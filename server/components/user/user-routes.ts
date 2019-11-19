import { Router } from "express";
import userController from "./user-controller";

const userRouter = Router();
const{createUser, loginUser, verifyToken, usernamExist, emailExist} = userController;

userRouter.post('/signup', usernamExist, emailExist, createUser)
userRouter.post('/login', loginUser)
userRouter.get('/verify/:token', verifyToken)


const api = {
    path: '/api/users',
    router: userRouter
}

export default api;