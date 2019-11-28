import { Router } from "express";
import orderController from "./order-controller";
import { isLoggedIn, isAdmin} from "../../middlewares/authorization";

const orderRouter = Router();
const{getOrders, getSingleOrder, editOrder, getOrdersInStatus} = orderController;

orderRouter.get("/orders", isLoggedIn, getOrders);
orderRouter.route("/orders/:orderId")
.get(isLoggedIn, getSingleOrder)
.put(isLoggedIn, isAdmin, editOrder)
orderRouter.get("/orders/:status/status", isLoggedIn, isAdmin, getOrdersInStatus)
const api = {
    path: "/api",
    router: orderRouter
}

export default api;