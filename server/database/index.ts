import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();
//const MONGODB_URL:any = process.env.MONGODB_URL
const { DB, DB_USER, DB_PASS } = process.env;
const dbUrl = `mongodb+srv://${DB_USER}:${DB_PASS}@cluster0.p1shx.mongodb.net/`; //'mongodb://localhost:27017/joelinks';

const connectToDb = (): void => {
  mongoose
    .connect(dbUrl, {
      dbName: DB,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => console.log("connected to joelinks db"))
    .catch((err) => console.log(err));
};

export default connectToDb;
