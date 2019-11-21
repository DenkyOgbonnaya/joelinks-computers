import Order  from "./order-model";

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
    }
}

export default orderService;