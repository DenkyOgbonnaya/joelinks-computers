import { Router } from "express";
import paystackController from "./paystck-controller";
import orderController from "../order/order-controller";
import { isLoggedIn} from "../../middlewares/authorization";
import { validateCheckoutData } from "./validation";
import validationResult from "../../middlewares/validation";
import productsController from "../products/products-controller";

const{initiatePayment, verifyPayment} = paystackController;
const{createOrder,} = orderController;
const{reserveProducts} = productsController;
const checkoutRouter = Router();

checkoutRouter.post('/checkout/:userId', 
    isLoggedIn, 
    validateCheckoutData, 
    validationResult,
    reserveProducts, 
    createOrder, 
    initiatePayment
)
checkoutRouter.get('/checkout/redirect', verifyPayment);

const api = {
    path: "/api",
    router: checkoutRouter
}
export default api;