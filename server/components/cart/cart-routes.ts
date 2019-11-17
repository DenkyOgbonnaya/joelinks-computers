import { Router } from "express";
import cartController from "./cart-controller";

const cartRouter = Router();
const{addToCart, updateQuantity, removeProduct, getCart} = cartController;

cartRouter.route("/cart")
.post(addToCart)
.get(getCart)

cartRouter.route("/cart/:productId")
.put(updateQuantity)
.delete(removeProduct)

const api = {
    path: "/api",
    router: cartRouter
}

export default api;