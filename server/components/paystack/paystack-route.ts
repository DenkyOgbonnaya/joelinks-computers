import { Router } from "express";
import paystackController from "./paystck-controller";
import orderController from "../order/order-controller";
import { isLoggedIn} from "../../middlewares/authorization";
import { validateCheckoutData } from "./validation";
import validationResult from "../../middlewares/validation";

const{initiatePayment, verifyPayment} = paystackController;
const{createOrder} = orderController;
const checkoutRouter = Router();

checkoutRouter.post('/checkout/:userId', isLoggedIn, validateCheckoutData, validationResult, createOrder, initiatePayment)
checkoutRouter.get('/checkout/redirect', verifyPayment);

const api = {
    path: "/api",
    router: checkoutRouter
}
export default api;