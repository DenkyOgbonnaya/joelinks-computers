export interface Product {
    _id: string
    name: string,
    price: number,
    discounted_price: number,
    category: string,
    brand: string,
    image: string
    description: string,
    attributes: {
        display: string,
        color: string,
        processor:string,
        ram:string
    }
}