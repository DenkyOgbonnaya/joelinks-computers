export interface Product {
    _id: string
    name: string,
    price: number,
    discounted_price: number,
    quantity: number,
    category: string,
    brand: string,
    images: any,
    description: string,
    attributes: {
        size: string,
        color: string,
        processor:string,
        ram:string
    }
}