import axios from "axios";
import { Request, Response } from "express";
import { calculateTotalPrice } from "./paystack-helper";
import orderService from "../order/order-service";
import { productsEvents } from "../products";

const paystackController = {
    async initiatePayment(req:Request, res:Response){
        const secretKey = `Bearer ${process.env.PAYSTACK_SK}`;
        const cart = req.session && req.session.cart;
        const amount = calculateTotalPrice(cart);
        const{email} = req.body

        const body = {
            amount: amount*100,
            email
        }
        
        const confiq = {
            headers : {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        try {
            const {data} = await axios.post('https://api.paystack.co/transaction/initialize', body, confiq);
            if(data){
                const authUrl = data.data.authorization_url
                res.status(201).send({authUrl});
            }
        } catch (err) {
            res.status(500).send(err);
        }
    },
    async verifyPayment(req:Request, res:Response){
        const secretKey = `Bearer ${process.env.PAYSTACK_SK}`;
        const cart = req.session && req.session.cart;
        const cartId = req.sessionID;

        const confiq = {
            headers : {
                authorization: secretKey,
                'content-type': 'application/json',
                'cache-control': 'no-cache'
            }
        }
        const{reference} = req.query;
        const orderId = req.session && req.session.orderId;
        
        try {
            const {data} = await axios.get(`https://api.paystack.co/transaction/verify/${encodeURIComponent(reference)}`, confiq);
            
            const ref = data.data.reference;
            
            if(ref){ 
            //successful checkout
                await orderService.edit(orderId, {paymentRef: ref, status: "Pending"});
                productsEvents.emit("releaseReservations", cart, cartId);
                
                if(req.session)
                req.session.cart = []; //empty cart
                return res.redirect(`https://joelinks-computers.herokuapp.com/user/order/${orderId}`)
            }
            //unsuccessful checkout
            await orderService.edit(orderId, {status: "Cancelled"})
            productsEvents.emit("returnProducts", cart, cartId);

            return res.redirect(`https://joelinks-computers.herokuapp.com/user/order/${orderId}`)
        } catch (err) {
            console.log(err);
            //redirect to error page
            res.redirect(`https://joelinks-computers.herokuapp.com`)
        }

    }
}

export default paystackController;