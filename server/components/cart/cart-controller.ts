import { Request, Response } from "express";

type CartItem = {
    _id:string,
    name:string,
    quantity:number,
    price:number,
    image:string
}
const cartController = {
    addToCart(req:Request, res:Response){
        const productId = req.body._id;

        if(req.session && req.session.cart){
            const product = req.session.cart.find( (item:CartItem) => item._id === productId)
            if(product){
                req.session.cart = req.session.cart.map( (item:CartItem) => 
                    item._id === productId ? Object.assign({}, item, {quantity: item.quantity+1}) : item);
            }else
                req.session.cart = req.session.cart.concat(req.body);
        }else if(req.session && !req.session.cart){
            req.session.cart = [req.body];
        }else {
            return res.status(400).send("fail to add product");
        }
        return res.status(200).send({message: "product added"});
    },
    updateQuantity(req:Request, res:Response){
        const{productId} = req.params;
        const{quantity} = req.body;

        if(req.session && req.session.cart){
            req.session.cart = req.session.cart.map( (item:CartItem) => item._id === productId ? Object.assign({}, item, {quantity}) : item);
            return res.status(200).send({message: "product quantity updated"});
        }else {
            return res.status(400).send("Invalid product id");
        }
    }, 
    removeProduct(req:Request, res:Response){
        const{productId} = req.params;

        if(req.session && req.session.cart){
            req.session.cart = req.session.cart.filter( (item:CartItem) => item._id !== productId);
            return res.status(200).send({message: "product removed"});
        }else {
            return res.status(400).send("Invalid product id");
        }
    },
    getCart(req:Request, res:Response){
        if(req.session && !req.session.cart){
            req.session.cart = [];
        }else if(!req.session)
            return res.status(400).send("no cart found");
        return res.status(200).send(req.session.cart);
    }
}
export default cartController;