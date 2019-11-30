import axios from "axios";
import { Request, Response } from "express";
import { calculateTotalPrice } from "./paystack-helper";
import orderService from "../order/order-service";

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
            //save reference to db
            if(ref){
                if(req.session)
                    req.session.cart = [];
                    
                await orderService.edit(orderId, {paymentRef: ref, status: "Pending"});
                return res.redirect(`http://localhost:4200/order/${orderId}`)
            }
            await orderService.edit(orderId, {status: "Cancelled"})
            return res.redirect(`http://localhost:4200/order/${orderId}`)
        } catch (err) {
            res.redirect(`http://localhost:4200`)
        }

    }
}

export default paystackController;