export const calculateTotalPrice = (cart:any) => {
    return cart.reduce( (acc:number, curr:any) => acc + curr.price*curr.quantity, 0);
}