export interface Product {
    _id: string
    name: string,
    price: number,
    discounted_price: number,
    category: string,
    brand: string,
    images: any,
    description: string,
    attributes: {
        display: string,
        color: string,
        processor:string,
        ram:string
    }
}