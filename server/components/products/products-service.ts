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
    async searchProduct(query:any){
        try{
            return await  Product.find(query)
        }catch(err){
            throw err;
        }
    },
}
export default productService;