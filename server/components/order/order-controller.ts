import { Request, Response, NextFunction } from "express";
import orderService from "./order-service";
import userEvent from "../user/user-event";

const{
    create,
    getAll,
    getOne,
    edit,
    getUserOrders,
    getOrdersInStaus
} = orderService;

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
    },
    async getOrders(req:Request, res:Response){
        try {
            const orders = await getAll();
            res.status(200).send({orders})
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getSingleOrder(req:Request, res:Response){
        const{orderId} = req.params;
        try {
            const order = await getOne(orderId);
            if(order)
                return res.status(200).send({order});
            return res.status(404).send({message: "order not found"})
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async editOrder(req:Request, res:Response){
        const{orderId} = req.params;
        try {
            const order = await edit(orderId, req.body);
            if(order)
                return res.status(200).send({order, message: "order edited successfully!"});
            return res.status(404).send({message: "order not found"})
        } catch (err) {
            res.status(500).send(err)
        }
    },
    async getUserOrders(req:Request, res:Response){
        const{userId} = req.params;
        
        try {
            const orders = await getUserOrders(userId);
            res.status(200).send({orders});
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async getOrdersInStatus(req:Request, res:Response){
        const{status} = req.params;

        try {
            const orders = await getOrdersInStaus(status);
            return res.status(200).send({orders});
        } catch (err) {
            res.status(500).send(err);
        }
    }
}

export default orderController;