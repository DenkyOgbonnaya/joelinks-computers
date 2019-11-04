import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URI || 'mongodb://localhost:27017/joelinks';

const connectToDb = ():void => {
    mongoose.connect(dbUrl, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected to joelinks db'))
    .catch(err => console.log(err))
}

export default connectToDb;