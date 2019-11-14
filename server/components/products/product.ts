import { Document } from "mongoose";
export interface IProduct extends Document {
    name: string,
    price: number,
    discounted_price: number,
    description: string,
    brand: string,
    category: string,
    images:any,
    quantity:number,
    attributes: {
        size: string,
        color: string,
        processor: string,
        ram: string
    }
}