import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
const MONGODB_URL:any = process.env.MONGODB_URL
const dbUrl = process.env.MONGODB_URI || MONGODB_URL //'mongodb://localhost:27017/joelinks';

const connectToDb = ():void => {
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to joelinks db'))
    .catch(err => console.log(err))
}

export default connectToDb;