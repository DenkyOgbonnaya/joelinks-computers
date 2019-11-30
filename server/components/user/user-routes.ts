import { Router } from "express";
import userController from "./user-controller";
import { orderController } from "../order";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";
import validationResult from "../../middlewares/validation";
import { validateLoginData, validateSignUpData, validateProfileData } from "./user-validations";

const userRouter = Router();
const{
    createUser, 
    loginUser, 
    verifyToken, 
    usernamExist, 
    emailExist, 
    getUsers,
    makeAdmin,
    disAdmin,
    editProfile,
    getUser
} = userController;
const{getUserOrders} = orderController;


userRouter.post('/signup', validateSignUpData, validationResult, usernamExist, emailExist, createUser)
userRouter.post('/login', validateLoginData, validationResult, loginUser)
userRouter.get('/verify/:token', verifyToken)
userRouter.get("/:userId/orders", isLoggedIn,  getUserOrders)
userRouter.route("/:userId")
.post(isLoggedIn, editProfile)
.get(isLoggedIn, getUser)
userRouter.get("/", isLoggedIn, isAdmin, getUsers)
userRouter.post("/:userId/makeadmin", isLoggedIn, isAdmin, makeAdmin)
userRouter.post("/:userId/disadmin", isLoggedIn, isAdmin, disAdmin)

const api = {
    path: '/api/users',
    router: userRouter
}

export default api;