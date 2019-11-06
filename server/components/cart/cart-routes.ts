import { Router } from "express";
import cartController from "./cart-controller";

const cartRouter = Router();
const{addToCart, updateQuantity, removeProduct, getCart} = cartController;

cartRouter.route("/cart/:cartId")
.post(addToCart)
.get(getCart)

cartRouter.route("/cart/:cartId/:productId")
.put(updateQuantity)
.delete(removeProduct)

const api = {
    path: "/api",
    router: cartRouter
}

export default api;