import { Router } from "express";
import orderController from "./order-controller";

const orderRouter = Router();
const{getOrders, getSingleOrder, editOrder, getOrdersInStatus} = orderController;

orderRouter.get("/orders", getOrders);
orderRouter.route("/orders/:orderId")
.get(getSingleOrder)
.put(editOrder)
orderRouter.get("/orders/:status/status", getOrdersInStatus)
const api = {
    path: "/api",
    router: orderRouter
}

export default api;