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
    discounted_price: {
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
        type: mongoose.Schema.Types.ObjectId,
    },
    attributes: {
        size: String,
        color: String,
        processor: String,
        ram: String
    }
})
export default mongoose.model<IProduct>('Product', productSchema);