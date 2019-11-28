import { Router } from "express";
import userController from "./user-controller";
import { orderController } from "../order";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";

const userRouter = Router();
const{
    createUser, 
    loginUser, 
    verifyToken, 
    usernamExist, 
    emailExist, 
    getUsers,
    makeAdmin,
    disAdmin
} = userController;
const{getUserOrders} = orderController;


userRouter.post('/signup', usernamExist, emailExist, createUser)
userRouter.post('/login', loginUser)
userRouter.get('/verify/:token', verifyToken)
userRouter.get("/:userId/orders", isLoggedIn,  getUserOrders)
userRouter.get("/", isLoggedIn, isAdmin, getUsers)
userRouter.post("/:userId/makeadmin", isLoggedIn, isAdmin, makeAdmin)
userRouter.post("/:userId/disadmin", isLoggedIn, isAdmin, disAdmin)

const api = {
    path: '/api/users',
    router: userRouter
}

export default api;