import Cart from "./cart-model";

type product = {
    productId: any,
    name: string,
    quantity: number
    price: number,
}
const cartService = {
    //add product to cart
    async add(cartId:string, product:product){
        try {
            const count = await Cart.countDocuments({});
            //if no existing cart doc, create cart
            if(count === 0){
                return await Cart.create({
                    cartId,
                    products: [product]
                })
            }else {
                //find user cart
                let cart = await Cart.findOne({cartId});
                if(!cart)
                    return await Cart.create({
                        cartId,
                        products: [product]
                    })
                const isProductInCart = cart && cart.products.find( cartProduct => cartProduct.productId == product.productId);
                
                if(isProductInCart)
                    return await Cart.findOneAndUpdate({cartId, "products.productId": product.productId, state: "active"}, {$inc:{"products.$.quantity": 1}}, {new:true})
                    //push to cart products
                return await Cart.findOneAndUpdate({cartId, state:"active"}, {$push:{products: product}}, {new: true})
                
            }
        } catch (err) {
            throw err;
        }
    },
    //will update product quantity in cart
    async update(cartId:string, productId:string, quantity:number){
        
        try {
            return await Cart.findOneAndUpdate({cartId, "products.productId": productId, state:"active"}, {$set: {"products.$.quantity": quantity}}, {new:true});
        } catch (err) {
            throw err;
        }
    },
    //remove product from cart
    async remove(cartId:string, productId:string){
        try {
        return await Cart.findOneAndUpdate({cartId}, {$pull: {products: {productId}}});
        } catch (err) {
            throw err;
        }
    },
    async get(cartId:string){
        try {
            return await Cart.findOne({cartId});
        } catch (err) {
            throw err;
            
        }
    }
}

export default cartService;