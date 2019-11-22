import Order  from "./order-model";
import { getEnabledCategories } from "trace_events";

const orderService = {
    async create(order:any){
        try {
            return await Order.create(order);
        } catch (err) {
            throw err;
        }
    },
    async edit(orderId:string, data:any){
        try {
            return await Order.findByIdAndUpdate(orderId, {$set: data})
        } catch (err) {
            throw err;
        }
    },
    async getAll(){
        try {
            return await Order.find({});
        } catch (err) {
            throw err;
        }
    },
    async getOne(id:string){
        try {
            return Order.findById(id);
        } catch (err) {
            throw err;
        }
    },
    async getUserOrders(userId:string){
        try {
            return await Order.find({user: userId});
        } catch (err) {
            throw err;
        }
    }
}

export default orderService;