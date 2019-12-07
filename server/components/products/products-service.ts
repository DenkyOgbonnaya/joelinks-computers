import Product from "./products-model";

const productService =  {
    async add(product: any){
        try {
            return await Product.create(product);
        } catch (err) {
            throw err;
        }
    },
    async getProducts(offset:number, limit:number){ 
        
        try {
            return await Product.find({}).skip(offset).limit(limit)
        } catch (err) {
            throw err;
        }
    },
    async getProductsCount(){
        try{
            return await Product.countDocuments();
        }catch(err){
            throw err;
        }
    },
    async getSingle(id:any){
        try {
            return await Product.findById(id);
        } catch (err) {
            throw err;
        }
    },
    async edit(id:any, data:any){
        try {
            return await Product.findByIdAndUpdate(id, {$set: data}, {new: true})
        } catch (err) {
            throw err;
        }
    },
    async deleteOne(id:any){
        try {
            return await Product.findByIdAndRemove(id);
        } catch (err) {
            throw err;
        }
    }, 
    async deleteImage(productId:string, imageId:string){
        try {
            const product = await Product.findById(productId);
            if(product){
                const updatedImages = product.images.filter( (image:any) => image.id !== imageId);
                product.images = updatedImages;
                product.save();
            }
            return product;
        } catch (err) {
            throw err;
        }
    },
    async searchProduct(query:any){
        try{
            return await  Product.find(query)
        }catch(err){
            throw err;
        }
    },
    async getSimilar(productCategory:string){
        try {
            return await Product.find({category: productCategory}).limit(4);
        } catch (err) {
            throw err;
        }
    },
    async getByCategory(productCategory:string){
        try {
            return await Product.find({category: productCategory});
        } catch (err) {
            throw err;
        }
    },
    async reserve(productId:string, sessionId:string, quantity:number){
        
        try {
            return await Product.findOneAndUpdate(
                {_id: productId, quantity: {$gte: quantity}}, 
                {
                $inc: {quantity: -quantity}, 
                $push: {
                    reservations: {quantity, cartId:sessionId}}
                })
        } catch (err) {
            throw err;
        }
    },
    //rollback product reservation attempt
    async rollbackReservation(productId:string, cartId:string, quantity:number){
        
        try {
            return Product.findOneAndUpdate({_id: productId}, {
                $inc: {quantity:quantity},
                $pull: {reservations: {cartId}}
            })
        } catch (err) {
            throw err;
        }
    },
    //release all reservations from the product collect fo successful checkout
    async pullReservation(cartId:string){
        
        try {
            return await Product.findOneAndUpdate({"reservations.cartId": cartId},
            {$pull: {reservations: {cartId}}},
            
            )
        } catch (err) {
            throw err;
        }
    }, 
    //return product quantity and release reservation on failed checkout
    async returnProducts(productId:string, cartId:string, quantity:number){
        try {
            return await Product.findOneAndUpdate(
                {_id: productId},
                {
                    $inc: {quantity},
                    $pull: {reservations: {cartId} }
                }
            )
        } catch (err) {
            throw err;
        }
    }

}
export default productService;