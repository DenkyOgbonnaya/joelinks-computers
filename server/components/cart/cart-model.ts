import mongoose, { Schema, Document } from "mongoose";
interface ICart extends Document {
    cartId: string,
    state?: string,
    products: {
        productId: Schema.Types.ObjectId,
        name: string,
        quantity: number,
        price: number
    }[]
}
const cartSchema: Schema = new Schema({
    cartId: {
        type: String,
        required: true
    },
    state: {
        type: String,
        enum: ["active", "inaactive"],
        default: "active"
    },
    products: [{
        productId: Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }]
},
{timestamps: true}
)

export default mongoose.model<ICart>("Cart", cartSchema)