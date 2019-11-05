import mongoose, { Schema, Document } from "mongoose";
interface ICategory extends Document {
    name: string,
    active?: boolean
}
const categoriesSchema: Schema = new Schema({
    name: {
        type: String,
        required: true
    },
    active: {
        type: Boolean,
        default: true
    }
})

export default mongoose.model<ICategory>('Category', categoriesSchema)
 