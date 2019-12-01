import mongoose, { Schema, Document } from "mongoose";
interface IUser extends Document {
    username: string,
    email: string,
    password?: string,
    oauthId?:string,
    profile?: {
        firstname: string,
        lastname?: string,
        address?: string,
        phone?: string,
        city?: string,
        state?: string,
        image?: string
    }
    isAdmin:boolean
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
        type: String
    },
    oauthId: {
        type: String
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
    },
    isAdmin: {
        type: Boolean,
        default: false
    }

},
{timestamps: true}
)

export default mongoose.model<IUser>('User', userSchema);
 
