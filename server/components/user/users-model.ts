import mongoose, { Schema, Document } from "mongoose";
interface IUser extends Document {
    username: string,
    email: string,
    password: string,
    profile?: {
        firstname: string,
        lastname?: string,
        address?: string,
        phone?: string,
        city?: string,
        state?: string,
        image?: string
    }
}
const userSchema: Schema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        default: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstname: {
            type: String
        },
        lastname: {
            type: String
        },
        address: {
            type: String
        },
        phone: {
            type: String
        },
        city: {
            type: String
        },
        state: {
            type: String
        },
        image: {
            type: String
        }
    }

},
{timestamps: true}
)

export default mongoose.model<IUser>('User', userSchema);
 
