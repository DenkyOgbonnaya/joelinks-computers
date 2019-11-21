import { Router } from "express";
import paystackController from "./paystck-controller";
import orderController from "../order/order-controller";

const{initiatePayment, verifyPayment} = paystackController;
const{createOrder} = orderController;
const checkoutRouter = Router();

checkoutRouter.post('/checkout/:userId', createOrder, initiatePayment)
checkoutRouter.get('/checkout/redirect', verifyPayment);

const api = {
    path: "/api",
    router: checkoutRouter
}
export default api;