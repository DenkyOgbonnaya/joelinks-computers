import mongoose, { Schema } from "mongoose";
import { IProduct } from "./product";

const productSchema: Schema = new Schema({
    name : {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    discountedPrice: {
        type: Number,
        default: 0
    },
    quantity: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
    },
    images: {
        type: Array
    },
    attributes: {
        size: String,
        processor: String,
        ram: String
    },
    reservations: [{
        cartId: String,
        quantity: Number,
        createdOn: {
            type: Date,
            default: Date.now()
        }
    }]
})
export default mongoose.model<IProduct>('Product', productSchema);