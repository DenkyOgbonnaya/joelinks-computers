import mongoose, { Schema, Document } from "mongoose";

interface IReview extends Document  {
    productId: Schema.Types.ObjectId,
    username: string,
    comment:string
}

const reviewSchema:Schema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
},
{timestamps:true}
)
export default mongoose.model<IReview>('Review', reviewSchema);
