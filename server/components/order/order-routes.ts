import { Router } from "express";
import orderController from "./order-controller";

const orderRouter = Router();
const{getOrders, getSingleOrder, editOrder} = orderController;

orderRouter.get("/orders", getOrders);
orderRouter.route("/orders/:orderId")
.get(getSingleOrder)
.put(editOrder)

const api = {
    path: "/api",
    router: orderRouter
}

export default api;