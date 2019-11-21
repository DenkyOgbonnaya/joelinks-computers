import mongoose, { Schema, Document } from "mongoose";

interface IOrder extends Document {
    items:any[],
    status:string,
    customerName:string,
    deliveryAddress:string,
    shippingFee?:number,
    user:Schema.Types.ObjectId
}

const orderSchema = new Schema({
    items: {
        type: Array
    },
    status: {
        type: String,
        enum: ["Failed", "Cancelled", "Pending", "Shipped", "Delivered"],
        default: "Cancelled"
    },
    customerName: {
        type: String
    },
    deliverAddress: {
        street:String,
        city:String,
        state:String
    },
    shippingFee: {
        type: Number,
        default: 0
    },
    paymentRef: String,
    user:{
        type: Schema.Types.ObjectId,
        ref: "Users"
    }
},
{timestamps: true}
)

export default mongoose.model<IOrder>("Order", orderSchema);