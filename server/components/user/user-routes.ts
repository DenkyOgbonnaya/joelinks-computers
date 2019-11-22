import { Router } from "express";
import userController from "./user-controller";
import { orderController } from "../order";
import { isLoggedIn} from "../../middlewares/authorization";

const userRouter = Router();
const{createUser, loginUser, verifyToken, usernamExist, emailExist} = userController;
const{getUserOrders} = orderController;


userRouter.post('/signup', usernamExist, emailExist, createUser)
userRouter.post('/login', loginUser)
userRouter.get('/verify/:token', verifyToken)
userRouter.get("/:userId/orders",  getUserOrders)


const api = {
    path: '/api/users',
    router: userRouter
}

export default api;