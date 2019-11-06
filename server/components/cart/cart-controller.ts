import { Request, Response } from "express";
import cartService from "./cart-service";
import { getEnabledCategories } from "trace_events";

const{
    add,
    update,
    remove,
    get
} = cartService;

const cartController = {
    async addToCart(req:Request, res:Response){
        const{cartId} = req.params;
        try {
            const cart = await add(cartId, req.body);
            if(cart){
                const product = cart.products.find(product => product.productId == req.body.productId);
                return res.status(200).send({product, message:"product added", status: "success"});
            }
            return res.status(400).send({message:"fail to add product", status: "error"});
        } catch (err) {
            res.status(500).send(err);
            
        }
    },
    async updateQuantity(req:Request, res:Response){
        const{cartId, productId} = req.params;
        const{quantity} = req.body;
        try {
            const cart = await update(cartId, productId, quantity);
            if(cart)
                return res.status(200).send({message: "product quantity updated", status:"success"});
            return res.status(400).send({message: "Invalid cart or product id", status:"error"});

        } catch (err) {
            res.status(500).send(err);
        }
    }, async removeProduct(req:Request, res:Response){
        const{cartId, productId} = req.params;
        try {
            const cart = await remove(cartId, productId);
            if(cart)
                return res.status(200).send({message: "product removed", status:"success"});
            return res.status(400).send({message: "Invalid cart or product id", status:"error"});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getCart(req:Request, res:Response){
        const{cartId} = req.params;
        try {
            const cart = await get(cartId);
            if(cart)
                return res.status(200).send({cart: cart.products, status:"success"});
            return res.status(400).send({message: "Invalid cart id", status: "error"})
        } catch (err) {
            
        }
    }
}
export default cartController;