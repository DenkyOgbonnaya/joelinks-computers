import { Request, Response, NextFunction } from "express";
import orderService from "./order-service";
import userEvent from "../user/user-event";

const{create} = orderService;

const orderController = {
    async createOrder(req:Request, res:Response, netxt:NextFunction){
        const{userId} = req.params;
        const{firstname, lastname, phone, address, city, state} = req.body;
        const items = req.session && req.session.cart;

        const order = {
            items,
            customerName: `${firstname} ${lastname}`,
            shippingAddress: {
                address,
                city,
                state
            },
            user: userId
        }
        try {
            const newOrder = await create(order);
            if(req.session)
                req.session.orderId = newOrder._id;
            userEvent.emit("addProfile", userId, {firstname, lastname, phone, address, city, state})
            netxt();
        } catch (err) {
            res.status(500).send(err)
        }
    }
}

export default orderController;